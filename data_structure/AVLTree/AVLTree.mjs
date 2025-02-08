import { AVL_BinaryTree } from "./BinaryTree.mjs";

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

  getUnBalanceNode(targetRootNode, unBalanceeNode = null) {
    if (
      targetRootNode.getLeftSubTree() === null &&
      targetRootNode.getRightSubTree() === null
    ) {
      unBalanceeNode = targetRootNode;
      return unBalanceeNode;
    }

    let balanceFactor = this.getBalanceFactor(targetRootNode);
    if (balanceFactor > 0) {
      unBalanceeNode = this.getUnBalanceNode(
        targetRootNode.getLeftSubTree(),
        unBalanceeNode
      );
    } else if (balanceFactor < 0) {
      unBalanceeNode = this.getUnBalanceNode(
        (targetRootNode = getRightSubTree()),
        unBalanceeNode
      );
    } else {
      unBalanceeNode = targetRootNode.getRightSubTree();
    }

    return unBalanceeNode;
  }
}

export { AVLTree };
