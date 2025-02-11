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
 * handleBlackSiblingWithAtLeastOneRedChild():
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

  rotateLeft(node) {
    let parent = node.getParent();
    let rightChild = node.getRightSubTree();
    node.setRightSubTree(rightChild.getLeftSubTree());

    if (rightChild.getLeftSubTree() !== null) {
      rightChild.getLeftSubTree().setParent(node);
    }

    rightChild.setLeftSubTree(node);
    node.setParent(rightChild);

    this.replaceParentsChild(parent, node, rightChild);
  }

  rotateRight(node) {
    let parent = node.getParent();
    let leftChild = node.getLeftSubTree();
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
