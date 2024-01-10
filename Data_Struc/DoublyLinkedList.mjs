/* 
연결리스트 (양방향)
1. 이전 노드 가르킬 prev 추가
*/

class Node {
  constructor(data, next = null, prev = null) {
    this.data = data;
    this.next = next;
    this.prev = prev;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null; // 연결 리스트의 시작 노드
    this.tail = null; // 연결 리스트의 마지막 노드 >> TODO 모든 노드가 이전 노드 참조할 수 있는 기능 구현(삽입,삭제 될 때만 신경 쓰기)
    this.count = 0; // 총 저장된 노드의 수
  }

  printAll() {
    let currentNode = this.head;
    let text = "[";

    while (currentNode != null) {
      text += currentNode.data;
      currentNode = currentNode.next;

      if (currentNode != null) {
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

  insertAt(index, data) {
    // 연결 리스트의 크기보다 큰 곳 OR 음수
    if (index > this.count || index < 0) {
      throw new Error("범위 Error");
    }

    let newNode = new Node(data);
    if (index === 0) {
      // head에 삽입
      newNode.next = this.head;
      if (this.head !== null) {
        this.head.prev = newNode;
      }
      this.head = newNode;
    } else if (index === this.count) {
      // tail에 삽입
      newNode.next = null;
      newNode.prev = this.tail;
      this.tail.next = newNode;
    } else {
      // 나머지 위치 삽입
      let currentNode = this.head;
      for (let i = 0; i < index - 1; i++) {
        currentNode = currentNode.next;
      }
      newNode.next = currentNode.next;
      newNode.prev = currentNode;
      currentNode.next = newNode;
      newNode.next.prev = newNode;
    }

    if (newNode.next === null) {
      this.tail = newNode;
    }

    this.count++;
  }

  insertLast(data) {
    this.insertAt(this.count, data);
  }

  deleteAt(index) {
    if (index > this.count || index < 0) {
      throw new Error("범위 Error");
    }

    let currentNode = this.head;

    if (index === 0) {
      // head 노드 제거
      let deletedNode = this.head;

      if (this.head.next === null) {
        //데이터가 1개 남은 경우
        this.head = null;
        this.tail = null;
      } else {
        // 2개 이상
        this.head = this.head.next;
        this.head.prev = null;
      }
      this.count--;
      return deletedNode;
    } else if (index === this.count - 1) {
      let deletedNode = this.tail;
      this.tail.prev.next = null;
      this.tail = this.tail.prev;
      this.count--;
      return deletedNode;
    } else {
      // head 노드 제외한 나머지 노드 제거
      for (let i = 0; i < index - 1; i++) {
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
    return this.deleteAt(this.count - 1);
  }

  getNodeAt(index) {
    if (index >= this.count || index < 0) {
      throw new Error("범위 오류");
    }

    let currentNode = this.head;
    for (let i = 0; i < index - 1; i++) {
      currentNode = currentNode.next;
    }
    return currentNode;
  }
}

export { Node, DoublyLinkedList };
