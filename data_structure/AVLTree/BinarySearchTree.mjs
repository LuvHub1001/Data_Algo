import { BinaryTree } from "./BinaryTree.mjs";

class BinarySearchTree {
  constructor(rootNode = null) {
    this.root = rootNode;
  }

  insert(data) {
    let currentNode = this.root;
    let parentNode = null;

    if (this.root === null) {
      this.root = new BinaryTree(data);
      return;
    }

    while (currentNode !== null) {
      parentNode = currentNode;
      if (currentNode.getData() === data) return;
      else if (currentNode.getData() > data)
        currentNode = currentNode.getLeftSubTree();
      else currentNode = currentNode.getRightSubTree();
    }

    let newNode = new BinaryTree(data);
    parentNode.getData() > data
      ? parentNode.setLeftSubTree(newNode)
      : parentNode.setRightSubTree(newNode);
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

  remove(targetData) {
    let fakeRootParentNode = new BinaryTree(0);
    let parentNode = fakeRootParentNode;
    let currentNode = this.root;
    let deletedNode = null;

    fakeRootParentNode.setRightSubTree(this.root);

    if (currentNode === null) return;

    while (currentNode !== null && currentNode.getData() !== targetData) {
      parentNode = currentNode;

      currentNode =
        currentNode.getData() > targetData
          ? currentNode.getLeftSubTree()
          : currentNode.getRightSubTree();
    }

    deletedNode = currentNode;

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
      let deletedChildNode;
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

      let deletedNodeData = deletedNode.getData();
      deletedNode.setData(replacingNode.getData());

      replacingParentNode.getLeftSubTree() === replacingNode
        ? replacingParentNode.setLeftSubTree(replacingNode.getLeftSubTree())
        : replacingParentNode.setRightSubTree(replacingNode.getLeftSubTree());

      deletedNode = replacingNode;
      deletedNode.setData(deletedNodeData);
    }

    if (fakeRootParentNode.getRightSubTree() !== this.root)
      this.root = fakeRootParentNode.getRightSubTree();

    return deletedNode;
  }
}

export { BinarySearchTree };
