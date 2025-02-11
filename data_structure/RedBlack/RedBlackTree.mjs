import { RedBlack_BinaryTree, RED, BLACK } from "./RedBlack_BinaryTree.mjs";
/**
 * 추상자료형
 *
 * 공통
 * rotateLeft(node)
 * rotateRight(node)
 * replaceParentsChild(parent,oldChild,newChild): 회전 하고 자식 노드 바꿔 줄 때 사용
 *
 * 삽입
 * insert(data)
 * rebalanceAfterInsertion(node) 데이터 삽입 후 균형 맞출 때 사용
 * getUncle(parent) 삼촌 노드 구할 때 사용
 *
 * 제거
 * remove(data)
 * removeWithZeroOrOneChild(node): 제거할 노드가 1개 이하의 자식 노드 가질 때 제거하는 함수
 * getBiggestNode(node): 대체할 노드를 가장 큰 값의 노드로 교체
 * rebalanceAfterDeletion(node): 데이터 제거 후 균형 맞추기 위한 함수
 * getSibling(node): 형제노드 구함
 * handleRedSibling(node, sibling): 형제 노드가 빨간색일 때 균형 맞춰줌
 * isBlack(node): 검은색인지 체크
 * handleBlackSiblingWithAtLeastOneRedChild(node, sibling):
 */

class RedBlackTree {
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

  // 1 3 5 7 9 형태, 5를 회전한다고 가정
  rotateLeft(node) {
    // node는 회전할 노드
    // 회전을 하게 되면 그 자리에는 다른 노드가 들어오게 됨 >> 부모노드가 자식노드를 대체한 노드로 연결해줘야 한다.
    let parent = node.getParent();
    let rightChild = node.getRightSubTree();

    // node(5) 회전하기 전에 오른쪽 자식노드(7)의 왼쪽 자식노드(NIL)를 node(5)의 오른쪽 자식노드로 연결해준다
    node.setRightSubTree(rightChild.getLeftSubTree());

    if (rightChild.getLeftSubTree() !== null) {
      // 부모노드로 회전할 노드(5)를 가리키게 한다.
      rightChild.getLeftSubTree().setParent(node);
    }

    rightChild.setLeftSubTree(node);
    node.setParent(rightChild);

    // 회전한 노드(5)의 부모노드(3)는 자식노드로 여전히 회전한 노드(5)를 가리키고 있으므로 바꿔줘야함
    this.replaceParentsChild(parent, node, rightChild);
  }

  // 9 7 5 3 1 형태, 5를 회전한다고 가정
  rotateRight(node) {
    let parent = node.getParent();
    let leftChild = node.getLeftSubTree();

    // node(5) 회전하기 전에 왼쪽 자식노드(3)의 오른쪽 자식노드(NIL)를 node(5)의 왼쪽 자식노드로 연결해준다
    node.setLeftSubTree(leftChild.getRightSubTree());

    if (leftChild.getRightSubTree() !== null) {
      leftChild.getRightSubTree().setParent(node);
    }

    leftChild.setRightSubTree(node);
    node.setParent(leftChild);

    this.replaceParentsChild(parent, node, leftChild);
  }

  replaceParentsChild(parent, oldChild, newChild) {
    if (parent === null) {
      this.root = newChild;
    } else if (parent.getLeftSubTree() === oldChild) {
      parent.setLeftSubTree(newChild);
    } else if (parent.getRightSubTree() === oldChild) {
      parent.setRightSubTree(newChild);
    }

    if (newChild !== null) {
      newChild.setParent(parent);
    }
  }
}

class NilNode extends RedBlack_BinaryTree {
  constructor() {
    super(0); // 부모 클래스 생성자 호출(RedBlack_BinaryTree)
    this.color = BLACK;
  }
}

export { RedBlackTree };
