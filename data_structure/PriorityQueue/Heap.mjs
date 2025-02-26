import { Heap_BinaryTree } from "./Heap_BinaryTree.mjs";

class Heap {
  constructor() {
    this.root = null;
    this.lastInsertedNode = null;
  }

  insert(data) {
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

    while (newNode.getParent() !== null) {
      if (
        this.isBigPriority(newNode.getData(), newNode.getParent().getData())
      ) {
        let tempData = newNode.getParent().getData();
        newNode.getParent().setData(newNode.getData());
        newNode.setData(tempData);
        newNode = newNode.getParent();
      } else break;
    }
  }

  getInsertingParent() {
    if (this.lastInsertedNode.getParent() === null) {
      return this.lastInsertedNode;
    } else {
      if (
        this.lastInsertedNode.getParent().getLeftSubTree() ===
        this.lastInsertedNode
      ) {
        return this.lastInsertedNode.getParent();
      } else {
        let current = this.lastInsertedNode;
        let firstRightSibling = null;

        while (current.getParent().getParent() !== null) {
          current = current.getParent();
          firstRightSibling = this.getRightSibling(current);
          if (firstRightSibling !== null) break;
        }

        if (firstRightSibling !== null) {
          while (firstRightSibling.getLeftSubTree() !== null) {
            firstRightSibling = firstRightSibling.getLeftSubTree();
          }
          return firstRightSibling;
        } else {
          current = this.root;
          while (current.getLeftSubTree() !== null) {
            current = current.getLeftSubTree();
          }
          return current;
        }
      }
    }
  }

  isBigPriority(first, second) {
    return first.priority < second.priority;
  }

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

  remove() {
    let deletedNode = null;

    if (this.lastInsertedNode === this.root) {
      deletedNode = this.root;
      this.root = null;
      this.lastInsertedNode = null;
      return deletedNode;
    }

    let prevLastInsertedNode = this.getNewLastInsertedNode();
    let tempData = this.root.getData();
    this.root.setData(this.lastInsertedNode.getData());
    this.lastInsertedNode.setData(tempData);

    if (
      this.lastInsertedNode.getParent().getLeftSubTree() ===
      this.lastInsertedNode
    ) {
      this.lastInsertedNode.getParent().setLeftSubTree(null);
    } else if (
      this.lastInsertedNode.getParent().getRightSubTree() ===
      this.lastInsertedNode
    ) {
      this.lastInsertedNode.getParent().setRightSubTree(null);
    }

    this.lastInsertedNode.setParent(null);
    deletedNode = this.lastInsertedNode;
    this.lastInsertedNode = prevLastInsertedNode;

    let current = this.root;
    do {
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
      this.lastInsertedNode.getParent().getLeftSubTree() ===
      this.lastInsertedNode
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
    if (left === null) return right;
    else if (right === null) return left;
    else if (this.isBigPriority(left.getData(), right.getData())) return left;
    else return right;
  }
}

export { Heap };
