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
    let current = this.head;
    while (current !== null) {
      text += current.data;
      current = current.next;
      if (current !== null) {
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
    if (idx > this.count || idx < 0) throw new Error("Insert Error");
    let newNode = new Node(data);

    if (idx === 0) {
      newNode.next = this.head;
      if (this.head !== null) {
        this.head.prev = newNode;
      }
      this.head = newNode;
    } else if (idx === this.count) {
      newNode.next = null;
      this.tail.next = newNode;
      newNode.prev = this.tail;
    } else {
      let current = this.head;
      for (let i = 0; i < idx - 1; i++) {
        current = current.next;
      }
      newNode.next = current.next;
      newNode.next.prev = newNode;
      newNode.prev = current;
      current.next = newNode;
    }

    if (newNode.next === null) this.tail = newNode;
    this.count++;
  }

  insertLast(data) {
    this.insertAt(this.count, data);
  }

  deleteAt(idx) {
    if (idx > this.count || idx < 0) throw new Error("Delete Error");
    let current = this.head;

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
        current = current.next;
      }
      let deletedNode = current.next;
      current.next = current.next.next;
      current.next.prev = current;
      this.count--;
      return deletedNode;
    }
  }

  deleteLast() {
    return this.deleteAt(this.count - 1);
  }

  getNodeAt(idx) {
    if (idx > this.count || idx < 0) throw new Error("getNodeAt 범위 오류");

    let current = this.head;
    for (let i = 0; i < idx; i++) {
      current = current.next;
    }
    return current;
  }
}

export { DoublyLinkedList };
