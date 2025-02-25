import { Heap_BinaryTree } from "./HeapBinaryTree.mjs";

class Heap {
  constructor() {
    this.root = null;
    this.lastInsertedNode = null; // 마지막으로 삽입된 노드의 위치
  }

  insert(data) {
    // 최초로 삽입 (== 마지막으로 삽입된 노드가 null을 가르킴)
    if (this.lastInsertedNode === null) {
      this.lastInsertedNode = new Heap_BinaryTree(data);
      this.root = this.lastInsertedNode;
      return;
    }

    let insertingParent = this.getInsertingParent();
    let newNode = new Heap_BinaryTree(data);

    if (insertingParent.getLeftSubTree() === null) {
      insertingParent.setLeftSubTree(newNode);
    } else if (insertingParent.getRightSubTree() === null) {
      insertingParent.setRightSubTree(newNode);
    }

    newNode.setParent(insertingParent);
    this.lastInsertedNode = newNode;

    // 새로 삽입된 데이터가 부모노드와 비교하며 우선순위에 맞게 위치 찾아감
    while (newNode.getParent() !== null) {
      if (
        this.isBigPriority(newNode.getData(), newNode.getParent().getData()) ===
        true
      ) {
        let tempData = newNode.getParent().getData();
        newNode.getParent().setData(newNode.getData());
        newNode.setData(tempData);
        newNode = newNode.getParent();
      } else {
        break;
      }
    }
  }

  // 새로 데이터가 삽입될 노드 위치의 부모노드 리턴
  getInsertingParent() {
    // 1. lastInsertedNode가 루트노드인 경우
    if (this.lastInsertedNode.getParent() === null) {
      return this.lastInsertedNode;
    } else {
      // 2. lastInsertedNode가 부모노드의 왼쪽 자식일 경우
      if (
        this.lastInsertedNode ===
        this.lastInsertedNode.getParent().getLeftSubTree()
      ) {
        return this.lastInsertedNode.getParent();
      }
      // 3. lastInsertedNode가 부모노드의 오른쪽 자식일 경우
      else {
        let current = this.lastInsertedNode;
        let firstRightSibiling = null;

        while (current.getParent().getParent() !== null) {
          current = current.getParent();
          firstRightSibiling = this.getRightSibling(current);
          if (firstRightSibiling !== null) {
            break;
          }
        }

        // 3-1. 부모노드 중에서 오른쪽 형제노드가 존재할 때
        if (firstRightSibiling !== null) {
          while (firstRightSibiling.getLeftSubTree() !== null) {
            firstRightSibiling = firstRightSibiling.getLeftSubTree();
          }
          return firstRightSibiling;
        } else {
          // 3-2. 부모노드 중에서 오른쪽 형제노드가 존재하지 않을 때
          current = this.root;
          while (current.getLeftSubTree() !== null) {
            current = current.getLeftSubTree();
          }
          return current;
        }
      }
    }
  }

  // 현재 노드가 부모노드의 오른쪽/왼쪽 자식노드가 아니라면
  getRightSibling(node) {
    let parent = node.getParent();
    if (parent.getRightSubTree() !== node) {
      return parent.getRightSubTree();
    }
    return null;
  }

  getLeftSibling(node) {
    let parent = node.getParent();
    if (parent.getLeftSubTree() !== node) {
      return parent.getLeftSubTree();
    }
    return null;
  }

  // 우선순위 비교(최소 힙 기준)
  isBigPriority(first, second) {
    return first < second;
  }

  remove() {
    let deletedNode = null;

    // 데이터가 1개 일 때
    if (this.lastInsertedNode === this.root) {
      deletedNode = this.root;
      this.root = null;
      this.lastInsertedNode = null;
      return deletedNode;
    }

    let prevLastInsertedNode = this.getNewLastInsertedNode(); // 마지막 이전에 삽입된 노드

    // 마지막에 삽입된 노드와 루트 노드 스왑
    let tempData = this.root.getData();
    this.root.setData(this.lastInsertedNode.getData());
    this.lastInsertedNode.setData(tempData);

    // 마지막 삽입된 노드 제거 (부모 노드의 왼쪽 / 오른쪽 자식인지 구분)
    if (
      this.lastInsertedNode ===
      this.lastInsertedNode.getParent().getLeftSubTree()
    ) {
      this.lastInsertedNode.getParent().setLeftSubTree(null);
    } else {
      this.lastInsertedNode.getParent().setRightSubTree(null);
    }

    this.lastInsertedNode.setParent(null);

    // 제거된 노드를 마지막에 삽입된 노드로 가리키기
    deletedNode = this.lastInsertedNode;
    this.lastInsertedNode = prevLastInsertedNode;

    // 루트노드부터 순회하며 자리 배치
    let current = this.root;
    do {
      // 우선순위가 더 높은 자식노드
      let higherChild = this.getHigherPriorityChild(
        current.getLeftSubTree(),
        current.getRightSubTree()
      );

      if (higherChild === null) break;
      else if (
        this.isBigPriority(current.getData(), higherChild.getData()) === false
      ) {
        let tempData = current.getData();
        current.setData(higherChild.getData());
        higherChild.setData(tempData);
        current = higherChild;
      } else break;
    } while (
      current.getLeftSubTree() !== null ||
      current.getRightSubTree() !== null
    );

    return deletedNode;
  }

  getNewLastInsertedNode() {
    let prevLastInsertedNode = null;

    if (
      this.lastInsertedNode ===
      this.lastInsertedNode.getParent().getLeftSubTree()
    ) {
      let current = this.lastInsertedNode;
      let firstLeftSibling = null;

      while (current.getParent().getParent() !== null) {
        current = current.getParent();
        firstLeftSibling = this.getLeftSibling(current);
        if (firstLeftSibling !== null) break;
      }

      if (firstLeftSibling !== null) {
        while (firstLeftSibling.getRightSubTree() !== null) {
          firstLeftSibling = firstLeftSibling.getRightSubTree();
        }
        prevLastInsertedNode = firstLeftSibling;
      } else {
        current = this.root;
        while (current.getRightSubTree() !== null) {
          current = current.getRightSubTree();
        }
        prevLastInsertedNode = current;
      }
    } else {
      prevLastInsertedNode = this.lastInsertedNode.getParent().getLeftSubTree();
    }

    return prevLastInsertedNode;
  }

  getHigherPriorityChild(left, right) {
    if (left === null) {
      return right;
    } else if (right === null) {
      return left;
    } else if (this.isBigPriority(left.getData(), right.getData())) {
      return left;
    } else {
      return right;
    }
  }
}

export { Heap };
