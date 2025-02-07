import { BinaryTree } from "./BinaryTree.mjs";

class BinarySearchTree {
  constructor(rootNode = null) {
    this.root = rootNode;
  }

  insert(data) {
    // 처음 삽입하는 경우
    if (this.root === null) {
      this.root = new BinaryTree(data);
      return;
    }

    let currentNode = this.root;
    let parentNode = null;

    while (currentNode !== null) {
      parentNode = currentNode;

      if (currentNode.getData() > data) {
        currentNode = currentNode.getLeftSubTree();
      } else if (currentNode.getData() < data) {
        currentNode = currentNode.getRightSubTree();
      } else {
        return;
      }
    }

    let newNode = new BinaryTree(data);

    if (parentNode.getData() > data) {
      parentNode.setLeftSubTree(newNode);
    } else {
      parentNode.setRightSubTree(newNode);
    }
  }

  search(targetData) {
    let currentNode = this.root;
    while (currentNode !== null) {
      if (currentNode.getData() === targetData) {
        return currentNode;
      } else if (currentNode.getData() > targetData) {
        currentNode = currentNode.getLeftSubTree();
      } else {
        currentNode = currentNode.getRightSubTree();
      }
    }

    return null;
  }

  /**
   * remove 구현 고려 사항
   * 상황1: 터미널 노드를 제거 할 때 >> 부모노드와 연결만 끊어주면 됨
   * 상황2: 자식노드가 한 개인 노드 제거 >> 자식 노드와 연결 끊어주고 부모 노드와 자식 노드와 연결해줌
   * 상황3: 자식노드가 두 개인 노드 제거 >>
   * 왼쪽 노드에서 가장 큰 값을 위로
   * 오른쪽 노드에서 가장 작은 값을 위로
   * 둘 다 이진탐색트리 규칙 어기지 않으면 아무거나 사용해도 됨
   * cf) 가장 큰 값은 오른쪽 노드를 타고 가면 됨
   *
   * BinaryTree에서 왼쪽 자식 노드 제거 함수, 오른쪽 자식 노드 제거 함수 부가적으로 필요
   */

  // 제거할 데이터는 10으로 가정
  remove(targetData) {
    let fakeParentRootNode = new BinaryTree(0); // 루트노드 제거할 때에 사용하기 위한 변수
    let parentNode = fakeParentRootNode;
    let currentNode = this.root;
    let deletedNode = null; // 제거할 노드를 담아서 반환해준다?

    fakeParentRootNode.setRightSubTree(this.root);

    while (currentNode !== null && currentNode.getData() !== targetData) {
      parentNode = currentNode;

      if (currentNode.getData() > targetData) {
        currentNode = currentNode.getLeftSubTree();
      } else {
        currentNode = currentNode.getRightSubTree();
      }
    }

    // 제거할 노드가 없을 때
    if (currentNode === null) {
      return;
    }

    // 터미널 노드 제거 (11제거 가정)
    deletedNode = currentNode;
    if (
      deletedNode.getLeftSubTree() === null &&
      deletedNode.getRightSubTree() === null
    ) {
      if (parentNode.getLeftSubTree() === deletedNode) {
        parentNode.removeLeftSubTree();
      } else {
        parentNode.removeRightSubTree();
      }
    }
    // 자식 노드 1개인 노드 제거 (8제거 가정) >> 기존 8은 가비지 컬렉터가 알아서 삭제해줌
    else if (
      deletedNode.getLeftSubTree() === null ||
      deletedNode.getRightSubTree() === null
    ) {
      let deletedNodeChild;
      if (deletedNode.getLeftSubTree() !== null) {
        deletedNodeChild = deletedNode.getLeftSubTree();
      } else {
        deletedNodeChild = deletedNode.getRightSubTree();
      }

      if (parentNode.getLeftSubTree() === deletedNode) {
        parentNode.setLeftSubTree(deletedNodeChild);
      } else {
        parent.setRightSubTree(deletedNodeChild);
      }
    }
    // 자식 노드 2개인 노드 제거 (10제거 가정)
    else {
      // 10을 지우지 않고 값을 8로만 대체해줌 >> 기존 8은 가비지 컬렉터가 알아서 삭제해줌
      let replacingNode = deletedNode.getLeftSubTree();
      let replacingNodeParent = deletedNode;

      while (replacingNode.getRightSubTree() !== null) {
        replacingNodeParent = replacingNode;
        replacingNode = replacingNode.getRightSubTree();
      }

      let deletedNodeData = deletedNode.getData();
      deletedNode.setData(replacingNode.getData());

      // 대체할 노드가 제일 큰 값이니까 오른쪽 노드는 존재할 수 없음
      if (replacingNodeParent.getLeftSubTree() === replacingNode) {
        replacingNodeParent.setLeftSubTree(replacingNode.getLeftSubTree());
      } else {
        replacingNodeParent.setRightSubTree(replacingNode.getLeftSubTree());
      }

      deletedNode = replacingNode;
      deletedNode.setData(deletedNodeData);
    }

    if (fakeParentRootNode.getRightSubTree() !== this.root) {
      this.root = fakeParentRootNode.getRightSubTree();
    }

    return deletedNode;
  }
}

export { BinarySearchTree };
