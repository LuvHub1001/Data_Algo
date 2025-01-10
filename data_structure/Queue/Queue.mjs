import { DoublyLinkedList } from "./DoublyLinkedList.mjs";

/**
 * enqueue 데이터 삽입
 * dequeue 데이터 제거
 * front 데이터 참조
 * isEmpty 큐가 비었는지 확인
 */

class Queue {
  constructor() {
    this.list = new DoublyLinkedList();
  }

  enqueue(data) {
    this.list.insertAt(0, data);
  }

  dequeue() {
    try {
      return this.list.deleteLast();
    } catch (e) {
      return null;
    }
  }

  front() {
    return this.list.tail;
  }

  isEmpty() {
    return this.list.count === 0;
  }
}

export { Queue };
