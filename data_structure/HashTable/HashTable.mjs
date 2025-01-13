import { DoublyLinkedList } from "../Deque/DoublyLinkedList.mjs";

/**
 * 1. set (데이터 삽입)
 * 2. get (데이터 읽기)
 * 3. remove (데이터 제거)
 */

class HashData {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }
}

class HashTable {
  constructor() {
    this.arr = [];
    for (let i = 0; i < 10; i++) {
      this.arr[i] = new DoublyLinkedList();
    }
  }

  hashFunction(number) {
    return number % 10;
  }

  set(key, value) {
    this.arr[this.hashFunction(key)].insertAt(0, new HashData(key, value));
  }

  get(key) {
    let currentNode = this.arr[this.hashFunction(key)].head;
    while (currentNode !== null) {
      if (currentNode.data.key === key) {
        return currentNode.data.value;
      }
      currentNode = currentNode.next;
    }
    return null;
  }

  remove(key) {
    let list = this.arr[this.hashFunction(key)];
    let currentNode = list.head;
    let deletedIndex = 0;
    while (currentNode !== null) {
      if (currentNode.data.key === key) {
        return list.deleteAt(deletedIndex);
      }
      currentNode = currentNode.next;
      deletedIndex++;
    }
    return null;
  }
}

export { HashTable };
