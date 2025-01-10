class Node {
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.count = 0;
  }

  printAll() {
    let text = "[";
    let currentNode = this.head;

    while (currentNode !== null) {
      text += currentNode.data;
      currentNode = currentNode.next;

      if (currentNode !== null) {
        text += ", ";
      }
    }
    text += "]";
    console.log(text);
  }

  clear() {
    this.head = null;
    this.count = 0;
  }

  insertAt(idx, data) {
    if (idx > this.count || idx < 0) throw new Error("insert 범위 오류");
    let newNode = new Node(data);

    if (idx === 0) {
      newNode.next = this.head;
      this.head = newNode;
    } else {
      let currentNode = this.head;
      for (let i = 0; i < idx - 1; i++) {
        currentNode = currentNode.next;
      }
      newNode.next = currentNode.next;
      currentNode.next = newNode;
    }
    this.count++;
  }

  insertLast(data) {
    this.insertAt(this.count, data);
  }

  deleteAt(idx) {
    if (idx > this.count || idx < 0) throw new Error("delete 범위 오류");
    let currentNode = this.head;

    if (idx === 0) {
      let deletedNode = this.head;
      this.head = deletedNode.next;
      this.count--;
      return deletedNode;
    } else {
      for (let i = 0; i < idx - 1; i++) {
        currentNode = currentNode.next;
      }
      let deletedNode = currentNode.next;
      currentNode.next = deletedNode.next;
      this.count--;
      return deletedNode;
    }
  }

  deleteLast() {
    return this.deleteAt(this.count - 1);
  }

  getNodeAt(idx) {
    if (idx > this.count || idx < 0) throw new Error("getNodeAt 범위 오류");

    let currentNode = this.head;
    for (let i = 0; i < idx; i++) {
      currentNode = currentNode.next;
    }
    return currentNode;
  }
}

export { Node, LinkedList };
