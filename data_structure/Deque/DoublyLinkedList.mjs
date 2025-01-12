class Node {
  constructor(data, next = null, prev = null) {
    this.data = data;
    this.next = next;
    this.prev = prev;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.count = 0;
  }

  printAll() {
    let text = "[";
    let currentNode = this.head;

    while (currentNode !== null) {
      text += currentNode.data;
      currentNode = currentNode.next;
      if (currentNode !== null) text += ", ";
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
      if (this.head !== null) {
        this.head.prev = newNode;
      }
      this.head = newNode;
    } else if (idx === this.count) {
      newNode.next = null;
      newNode.prev = this.tail;
      this.tail.next = newNode;
    } else {
      let currentNode = this.head;
      for (let i = 0; i < idx - 1; i++) {
        currentNode = currentNode.next;
      }
      newNode.next = currentNode.next;
      newNode.prev = currentNode;
      currentNode.next = newNode;
      newNode.next.prev = newNode;
    }
    if (newNode.next === null) this.tail = newNode;
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
      if (this.head.next === null) {
        this.head = null;
        this.tail = null;
      } else {
        this.head = this.head.next;
        this.head.prev = null;
      }
      this.count--;
      return deletedNode;
    } else if (idx === this.count - 1) {
      let deletedNode = this.tail;
      this.tail.prev.next = null;
      this.tail = this.tail.prev;
      this.count--;
      return deletedNode;
    } else {
      for (let i = 0; i < idx - 1; i++) {
        currentNode = currentNode.next;
      }
      let deletedNode = currentNode.next;
      currentNode.next = currentNode.next.next;
      currentNode.next.prev = currentNode;
      this.count--;
      return deletedNode;
    }
  }

  deleteLast() {
    this.deleteAt(this.count - 1);
  }

  getNodeAt(idx) {
    if (idx > this.count || idx < 0) throw new Error("get Node At 범위 오류");
    let currentNode = this.head;
    for (let i = 0; i < idx; i++) {
      currentNode = currentNode.next;
    }
    return currentNode;
  }
}

export { Node, DoublyLinkedList };
