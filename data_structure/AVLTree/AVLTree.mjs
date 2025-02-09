import { AVL_BinaryTree } from "./AVL_BinaryTree.mjs";

/**
추상 자료형
(( insert와 remove는 재귀 ))
 * insert(targetRootNode, data)
 * remove(targetRootNode, data, parentNode = null)
 * getHeight(node):: 노드 높이 구하기
 * updatHeight(node):: 해당 노드의 높이 새로 구하기
 * getBalanceFactor(node):: 해당 노드가 균형 이뤘는지 체크 :: 양수면 왼쪽 트리가 더 높고, 음수면 오른쪽 트리가 더 높다
 * rotateLeft(node):: LL회전 시키는 함수 (연결 하기 전에 자식 노드 존재 상황 고려)
 * rotateRight(node):: RR회전 시키는 함수 (연결 하기 전에 자식 노드 존재 상황 고려)
 * rotation(targetNode, data):: 실제로 LL, RR, LR, RL 회전 시키는 함수 rotateLeft와 rotateRight 쓰임
 * getUnBalanceNode(targetRootNode):: 균형이 무너진 트리에서 균형을 무너뜨린 노드 찾는 함수
 * removeHelper(deletingNode, data, parentNode)
 * 
 * 
 */

class AVLTree {
  constructor(rootNode = null) {
    this.root = rootNode;
  }

  search(targetData) {
    let currentNode = this.root;
    while (currentNode !== null) {
      if (currentNode.getData() === targetData) return currentNode;
      else if (currentNode.getData() > targetData)
        currentNode = currentNode.getLeftSubTree();
      else currentNode = currentNode.getRightSubTree();
    }

    return null;
  }

  getHeight(node) {
    if (node === null) return 0;
    else return node.height;
  }

  // 1이 LL 회전 한 후의 높이라고 가정(== node 매개변수: 1)
  updateHeight(node) {
    let leftChildHeight = this.getHeight(node.getLeftSubTree());
    let rightChildHeight = this.getHeight(node.getRightSubTree());
    node.height = Math.max(leftChildHeight, rightChildHeight) + 1;
  }

  getBalanceFactor(node) {
    return (
      this.getHeight(node.getLeftSubTree()) -
      this.getHeight(node.getRightSubTree())
    );
  }

  rotateLeft(node) {
    let childNode = node.getRightSubTree();
    node.setRightSubTree(childNode.getLeftSubTree());
    childNode.setLeftSubTree(node);

    this.updateHeight(node);
    this.updateHeight(childNode);

    return childNode;
  }

  rotateRight(node) {
    let childNode = node.getLeftSubTree();
    node.setLeftSubTree(childNode);
    childNode.setRightSubTree(node);

    this.updateHeight(node);
    this.updateHeight(childNode);

    return childNode;
  }

  // targetNode: 회전시킬 노드, data: 균형을 무너트린 노드
  rotation(targetNode, data) {
    let balanceFactor = this.getBalanceFactor(targetNode);
    let isRootNode = false;
    if (targetNode === this.root) isRootNode = true;

    // LL
    if (balanceFactor < -1 && data > targetNode.getRightSubTree().getData()) {
      targetNode = this.rotateLeft(targetNode);
    }
    // RR
    else if (
      balanceFactor > 1 &&
      data < targetNode.getLeftSubTree().getData()
    ) {
      targetNode = this.rotateRight(targetNode);
    }
    // LR
    else if (
      balanceFactor > 1 &&
      data > targetNode.getLeftSubTree().getData()
    ) {
      targetNode.setLeftSubTree(this.rotateLeft(targetNode.getLeftSubTree()));
      targetNode = this.rotateRight(targetNode);
    }
    // RL
    else if (
      balanceFactor < -1 &&
      data < targetNode.getRightSubTree().getData()
    ) {
      targetNode.setRightSubTree(
        this.rotateRight(targetNode.getRightSubTree())
      );
      targetNode = this.rotateLeft(targetNode);
    }

    if (isRootNode) {
      this.root = targetNode;
    }

    return targetNode;
  }

  getUnBalanceNode(targetRootNode, unBalanceNode = null) {
    if (
      targetRootNode.getLeftSubTree() === null &&
      targetRootNode.getRightSubTree() === null
    ) {
      unBalanceNode = targetRootNode;
      return unBalanceNode;
    }

    let balanceFactor = this.getBalanceFactor(targetRootNode);
    if (balanceFactor > 0) {
      unBalanceNode = this.getUnBalanceNode(
        targetRootNode.getLeftSubTree(),
        unBalanceNode
      );
    } else if (balanceFactor < 0) {
      unBalanceNode = this.getUnBalanceNode(
        targetRootNode.getRightSubTree(),
        unBalanceNode
      );
    } else {
      unBalanceNode = targetRootNode.getRightSubTree();
    }

    return unBalanceNode;
  }

  /**
   * targetRootNode: 데이터를 삽입할 루트 노드
   * data: 삽입할 데이터
   */

  // (5, 3) 1을 삽입하는 경우
  insert(targetRootNode, data) {
    // 기저 조건(삽입하려는 노드가 null == 최초에 삽입 or 터미널 노드에 삽입)
    if (targetRootNode === null) {
      targetRootNode = new AVL_BinaryTree(data);
    }

    // 트리에 처음 데이터 삽입하는 경우
    if (this.root === null) {
      this.root = targetRootNode;
    }
    // 중복 데이터 삽입하는 경우
    else if (targetRootNode.getData() === data) return targetRootNode;
    else if (targetRootNode.getData() > data) {
      targetRootNode.setLeftSubTree(
        this.insert(targetRootNode.getLeftSubTree(), data)
      );
    } else if (targetRootNode.getData() < data) {
      targetRootNode.setRightSubTree(
        this.insert(targetRootNode.getRightSubTree(), data)
      );
    }

    this.updateHeight(targetRootNode);
    targetRootNode = this.rotation(targetRootNode, data);

    return targetRootNode;
  }

  // (5,3) 4를 삭제하는 경우우
  remove(targetRootNode, data, parentNode = null) {
    // 삭제할 노드가 왼쪽 자식노드에 있을 때
    if (
      targetRootNode.getData() > data &&
      targetRootNode.getLeftSubTree() !== null
    ) {
      targetRootNode.setLeftSubTree(
        this.remove(targetRootNode.getLeftSubTree(), data, targetRootNode)
      );
    } else if (
      targetRootNode.getData() < data &&
      targetRootNode.getRightSubTree() !== null
    ) {
      // 삭제할 노드가 오른쪽 자식노드에 있을 때
      targetRootNode.setRightSubTree(
        this.remove(targetRootNode.getRightSubTree(), data, targetRootNode)
      );
    } else if (targetRootNode.getData() === data) {
      targetRootNode = this.removeHelper(targetRootNode, parentNode);

      if (parentNode === null && targetRootNode !== null) {
        this.updateHeight(targetRootNode);
        let unBalanceNode = this.getUnBalanceNode(targetRootNode);

        targetRootNode = this.rotation(targetRootNode, unBalanceNode.getData());
      }

      return targetRootNode;
    }

    this.updateHeight(targetRootNode);

    // insert에서는 삽입하는 노드가 균형을 무너트리므로 신경 안써도 됐지만
    // remove에서는 어떤 노드가 제거됐을 때 균형이 무너지는지 알아야하므로 구해야함
    let unBalanceNode = this.getUnBalanceNode(targetRootNode);
    targetRootNode = this.rotation(targetRootNode, unBalanceNode.getData());
    return targetRootNode;
  }

  // removeHelper(): 해당 노드 삭제하고, 대체되는 노드(== 자식 노드) 리턴하는 함수
  removeHelper(deletedNode, parentNode) {
    let fakeRootParentNode = new AVL_BinaryTree(0);
    fakeRootParentNode.setRightSubTree(this.root);

    if (parentNode == null) {
      parentNode = fakeRootParentNode;
    }

    let deletedChildNode = null;

    if (
      deletedNode.getLeftSubTree() === null &&
      deletedNode.getRightSubTree() === null
    ) {
      parentNode.getLeftSubTree() === deletedNode
        ? parentNode.removeLeftSubTree()
        : parentNode.removeRightSubTree();
    } else if (
      deletedNode.getLeftSubTree() === null ||
      deletedNode.getRightSubTree() === null
    ) {
      deletedChildNode =
        deletedNode.getLeftSubTree() !== null
          ? deletedNode.getLeftSubTree()
          : deletedNode.getRightSubTree();

      parentNode.getLeftSubTree() === deletedNode
        ? parentNode.setLeftSubTree(deletedChildNode)
        : parentNode.setRightSubTree(deletedChildNode);
    } else {
      let replacingNode = deletedNode.getLeftSubTree();
      let replacingParentNode = deletedNode;

      while (replacingNode.getRightSubTree() !== null) {
        replacingParentNode = replacingNode;
        replacingNode = replacingNode.getRightSubTree();
      }

      deletedNode.setData(replacingNode.getData());

      replacingParentNode.getLeftSubTree() === replacingNode
        ? replacingParentNode.setLeftSubTree(replacingNode.getLeftSubTree())
        : replacingParentNode.setRightSubTree(replacingNode.getLeftSubTree());

      deletedChildNode = deletedNode;
    }

    if (fakeRootParentNode.getRightSubTree() !== this.root)
      this.root = fakeRootParentNode.getRightSubTree();

    return deletedChildNode;
  }
}

export { AVLTree };
