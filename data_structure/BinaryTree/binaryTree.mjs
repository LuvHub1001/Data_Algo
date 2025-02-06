/**
 * 이진 트리의 추상 자료형
 
 * getData()- 해당 트리(노드)의 데이터 리턴
 * setData(data) - 해당 트리(노드)의 데이터 설정
 * getLeftSubTree() - 해당 트리(노드)의 왼쪽 서브 트리 리턴
 * getRightSubTree() - 해당 트리(노드)의 오른쪽 서브 트리 리턴
 * setLeftSubTree(tree) - 해당 트리의 왼쪽 서브 트리를 tree로 설정
 * setRightSubTree(tree) - 해당 트리의 오른쪽 서브 트리를 tree로 설정

 * preOrderTraversal() - 전위순회 (1-2-3 > 루트노드 먼저 출력)
 * inOrderTraversal() - 중위순회 (2-1-3 > 루트노드를 중간에 출력)
 * postOrderTraversal() - 후위순회 (2-3-1 > 루트노드를 마지막에 출력)
 *
 */

class BinaryTree {
  constructor(data, leftTree = null, rightTree = null) {
    this.data = data;
    this.leftSubTree = leftTree;
    this.rightSubTree = rightTree;
  }

  getData() {
    return this.data;
  }

  setData(data) {
    this.data = data;
  }

  getLeftSubTree() {
    return this.leftSubTree;
  }

  getRightSubTree() {
    return this.rightSubTree;
  }

  // 현재 노드의 왼쪽 노드를 해당 노드로 설정
  setLeftSubTree(tree) {
    this.leftSubTree = tree;
  }

  // 현재 노드의 오른쪽 노드를 해당 노드로 설정
  setRightSubTree(tree) {
    this.rightSubTree = tree;
  }

  // 전위 순회
  preOrderTraversal(tree) {
    if (tree === null) return;
    console.log(tree.data);
    this.preOrderTraversal(tree.getLeftSubTree());
    this.preOrderTraversal(tree.getRightSubTree());
  }

  // 중위 순회
  inOrderTraversal(tree) {
    if (tree === null) return;
    this.inOrderTraversal(tree.getLeftSubTree());
    console.log(tree.data);
    this.inOrderTraversal(tree.getRightSubTree());
  }

  // 후위 순회
  postOrderTraversal(tree) {
    if (tree === null) return;
    this.postOrderTraversal(tree.getLeftSubTree());
    this.postOrderTraversal(tree.getRightSubTree());
    console.log(tree.data);
  }
}

export { BinaryTree };
