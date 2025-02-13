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

  // 1 2 3 트리에서 5를 삽입한다고 가정
  insert(data) {
    // 이진탐색트리와 똑같이 수행하고 마지막에 균형 잡아주는 rebalanceAfterInsertion()만 호출해주면 됨
    let currentNode = this.root;
    let parent = null;

    while (currentNode !== null) {
      parent = currentNode;
      if (currentNode.getData() === data) return;
      else if (currentNode.getData() > data)
        currentNode = currentNode.getLeftSubTree();
      else currentNode = currentNode.getRightSubTree();
    }

    let newNode = new RedBlack_BinaryTree(data);
    if (parent === null) {
      this.root = newNode;
    } else if (parent.getData() > data) {
      parent.setLeftSubTree(newNode);
    } else {
      parent.setRightSubTree(newNode);
    }

    newNode.setParent(parent);
    this.rebalanceAfterInsertion(newNode);
  }

  // node 매개변수는 새로 삽입된 노드
  rebalanceAfterInsertion(node) {
    /**
     * 1. 새로운 노드가 루트노드인 경우
     * 2. 부모노드와 삼촌노드가 빨간색인 경우
     * 3. 부모노드는 빨간색이고, 삼촌노드는 검은색, 새로운 노드는 안쪽 손자인 경우
     * 4. 부모노드는 빨간색이고, 삼촌노드는 검은색, 새로운 노드는 바깥쪽 손자인 경우
     */

    let parent = node.getParent();

    if (parent === null) {
      node.color = BLACK;
      return;
    }

    if (parent.color === BLACK) return; // 부모노드가 빨간색이면 return 되니까 밑에서부터는 parent.color 검사 안해도 됨

    let uncle = this.getUncle(parent);
    let grandParent = parent.getParent();

    // 2번 상황 >> 부모노드와 삼촌노드를 검은색으로 변경
    if (uncle !== null && uncle.color === RED) {
      parent.color = BLACK;
      uncle.color = BLACK;
      grandParent.color = RED;
      this.rebalanceAfterInsertion(grandParent);
    }

    // 3번 상황 >> 부모노드 삽입된 데이터 반대 방향 회전 -> 할아버지 노드를 부모노드 회전한 반대 방향으로 회전 -> 새로 삽입된 노드를 검은색으로 -> 할아버지 노드를 빨간색으로
    else if (this.isBlack(uncle) === true) {
      // 오른쪽 안쪽 손자
      if (
        grandParent.getRightSubTree() === parent &&
        parent.getLeftSubTree() === node
      ) {
        // 부모노드를 삽입된 데이터의 반대 방향으로 회전한다. (3-5), 4 삽입 가정
        this.rotateRight(parent);
        // 할아버지 노드를 부모 노드가 회전한 반대 방향으로 회전
        this.rotateLeft(grandParent);
        node.color = BLACK;
        grandParent.color = RED;
      } else if (
        grandParent.getLeftSubTree() === parent &&
        parent.getRightSubTree() === node
      ) {
        // 왼쪽 안쪽 손자
        this.rotateLeft(parent);
        this.rotateRight(grandParent);
        node.color = BLACK;
        grandParent.color = RED;
      }
      // 4번 상황 (5-7),9 삽입 가정 > 할아버지 노드를 새로운 노드 삽입된 반대 방향으로 회전 > 부모노드를 검은색, 할아버지 노드를 빨간색으로 변경
      else if (
        grandParent.getRightSubTree() === parent &&
        parent.getRightSubTree() === node
      ) {
        // 할아버지 노드를 새로운 노드 삽입된 반대 방향으로 회전
        this.rotateLeft(grandParent);
        // 부모노드의 색을 검은색으로, 할아버지 노드의 색을 빨간색으로 변경
        parent.color = BLACK;
        grandParent.color = RED;
      } else if (
        grandParent.getLeftSubTree() === parent &&
        parent.getLeftSubTree() === node
      ) {
        // 왼쪽 바깥쪽 손자 (5-3),1 삽입
        this.rotateRight(grandParent);
        parent.color = BLACK;
        grandParent.color = RED;
      }
    }
  }

  // 1 3 5 7 형태 트리
  getUncle(parent) {
    let grandParent = parent.getParent();
    if (grandParent.getLeftSubTree() === parent) {
      return grandParent.getRightSubTree();
    } else if (grandParent.getRightSubTree() === parent) {
      return grandParent.getLeftSubTree();
    }

    return null;
  }

  isBlack(node) {
    return node === null || node.color === BLACK;
  }

  remove(data) {
    let currentNode = this.root;
    while (currentNode != null && currentNode.getData() != data) {
      if (currentNode.getData() > data)
        currentNode = currentNode.getLeftSubTree();
      else if (currentNode.getData() < data)
        currentNode = currentNode.getRightSubTree();
    }

    if (currentNode === null) return;

    // 대체할 노드
    let replacingNode = null;

    // 삭제된 노드의 색깔
    let deletedNodeColor = RED;

    // 제거할 노드의 자식노드가 1개 이하
    if (
      currentNode.getLeftSubTree() === null ||
      currentNode.getRightSubTree() === null
    ) {
      replacingNode = this.removeWithZeroOrOneChild(currentNode);
      deletedNodeColor = currentNode.color;
    } else {
      // 제거할 노드의 자식노드가 2개 (3-5-7-8-10) 8 제거 가정
      let succesor = this.getBiggestNode(currentNode.getLeftSubTree());
      currentNode.setData(succesor.getData());

      // 3-5-7-7-10 처럼 됨
      // (왼쪽 자식 노드 중)가장 큰 노드는 자식 노드가 1개 이하이므로 removeWithZeroOneChild 사용
      replacingNode = this.removeWithZeroOrOneChild(succesor);
      deletedNodeColor = currentNode.color;
    }

    if (deletedNodeColor === BLACK) {
      this.rebalanceAfterDeletion(replacingNode);

      // 대체된 노드가 닐노드였으면 다시 null로 바꿔줌
      if (replacingNode instanceof NilNode) {
        this.replaceParentsChild(
          replacingNode.getParent(),
          replacingNode,
          null
        );
      }
    }
  }

  // 매개변수 node는 대체된 노드를 담고 있음
  rebalanceAfterDeletion(node) {
    /**
     * 1. 형제 노드가 빨간색인 경우
     * 2. 형제노드와 형제노드의 두 자식노드가 검은색이고, 부모노드는 빨간색인 경우
     * 3. 형제노드와 형제노드의 두 자식노드, 부모노드가 모두 검은색인 경우
     * 4. 형제노드가 검은색이고, 형제의 두 자식노드 중 하나라도 빨간색 노드가 있고 "바깥쪽 조카 노드"가 검은색인 경우
     * 5. 형제노드가 검은색이고, 형제의 두 자식노드 중 하나라도 빨간색 노드가 있고 "바깥쪽 조카 노드"가 빨간색인 경우
     **/

    if (node === this.root) {
      node.color == BLACK;
      return;
    }

    let parent = node.getParent();

    // 대체할 노드의 형제 노드
    let sibling = this.getSibling(node);

    if (sibling.color === RED) {
      this.handleRedSibling(node, sibling);
      sibling = this.getSibling(node);
    }

    if (this.isBlack(sibling)) {
      // 5 - 10 - 12 - 15 - 19 에서 19 제거 가정
      if (
        this.isBlack(sibling.getLeftSubTree()) &&
        this.isBlack(sibling.getRightSubTree())
      ) {
        if (parent.color === RED) {
          sibling.color = RED;
          parent.color = BLACK;
        } else {
          sibling.color = RED;
          this.rebalanceAfterDeletion(parent);
        }
      } else {
        this.handleBlackSiblingWithAtLeastOneRedChild(node, sibling);
      }
    }
  }

  getSibling(node) {
    let parent = node.getParent();

    if (node === parent.getLeftSubTree()) {
      return parent.getRightSubTree();
    } else if (node === parent.getRightSubTree()) {
      return parent.getLeftSubTree();
    }
  }

  // 매개변수 node: 대체된 노드, sibling: 형제 노드
  handleRedSibling(node, sibling) {
    let parent = node.getParent();
    sibling.color = BLACK;
    parent.color = RED;

    if (parent.getLeftSubTree() === node) {
      this.rotateLeft(parent);
    } else if (parent.getRightSubTree() === node) {
      this.rotateRight(parent);
    }
  }

  // 매개변수 node: 대체된 노드, sibling: 형제 노드
  handleBlackSiblingWithAtLeastOneRedChild(node, sibling) {
    let parent = node.getParent();
    let nodeIsLeftChild = parent.getLeftSubTree() === node;

    if (nodeIsLeftChild === true && this.isBlack(sibling.getRightSubTree())) {
      sibling.getLeftSubTree().color = BLACK;
      sibling.color = RED;
      this.rotateRight(sibling);
      sibling = parent.getRightSubTree();
    } else if (
      nodeIsLeftChild === false &&
      this.isBlack(sibling.getLeftSubTree())
    ) {
      sibling.getRightSubTree().color = BLACK;
      sibling.color = RED;
      this.rotateLeft(sibling);
      sibling = parent.getLeftSubTree();
    }

    sibling.color = parent.color;
    parent.color = BLACK;
    if (nodeIsLeftChild) {
      sibling.getRightSubTree().color = BLACK;
      this.rotateLeft(parent);
    } else {
      sibling.getLeftSubTree().color = BLACK;
      this.rotateRight(parent);
    }
  }

  // node: 제거할 노드
  removeWithZeroOrOneChild(node) {
    let parent = node.getParent();

    if (node.getLeftSubTree() !== null) {
      // 3-5-8-7 에서 8 제거 한다고 가정
      this.replaceParentsChild(parent, node, node.getLeftSubTree());
      return node.getLeftSubTree();
    } else if (node.getRightSubTree() !== null) {
      // 3-5-8-10 에서 8 제거 한다고 가정
      this.replaceParentsChild(parent, node, node.getRightSubTree());
      return node.getRightSubTree();
    } else {
      // 자식 노드 양쪽 다 null (3-5-8 에서 8 제거 한다고 가정)
      let newChild = node.color === BLACK ? new NilNode() : null;
      this.replaceParentsChild(parent, node, newChild);
      return newChild;
    }
  }

  getBiggestNode(node) {
    while (node.getRightSubTree() !== null) {
      node = node.getRightSubTree();
    }
    return node;
  }
}

class NilNode extends RedBlack_BinaryTree {
  constructor() {
    super(0); // 부모 클래스 생성자 호출(RedBlack_BinaryTree)
    this.color = BLACK;
  }
}

export { RedBlackTree };
