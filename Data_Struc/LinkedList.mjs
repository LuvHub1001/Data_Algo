/* 
연결리스트의 추상자료형
    1. 모든 데이터 출력 == printAll()
    2. 모든 데이터 제거 == clear()
    3. 인덱스 삽입 == insertAt(index,data)
    4. 마지막 삽입 == insertLast(data)
    5. 인덱스 삭제 == deleteAt(index)
    6. 마지막 삭제 == deleteLast()
    7. 인덱스 읽기 == getNodeAt(index)
*/

class Node {
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null; // 연결 리스트의 시작 노드
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
      // 가장 앞부분 삽입
      newNode.next = this.head;
      this.head = newNode;
    } else {
      // 나머지 위치 삽입
      let currentNode = this.head;
      for (let i = 0; i < index - 1; i++) {
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

  deleteAt(index) {
    if (index > this.count || index < 0) {
      throw new Error("범위 Error");
    }

    let currentNode = this.head;

    if (index === 0) {
      // head 노드 제거
      let deletedNode = this.head;
      this.head = this.head.next;
      this.count--;
      return deletedNode;
    } else {
      // head 노드 제외한 나머지 노드 제거
      for (let i = 0; i < index - 1; i++) {
        currentNode = currentNode.next;
      }
      let deletedNode = currentNode.next;
      currentNode.next = currentNode.next.next;
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

export { Node, LinkedList };
