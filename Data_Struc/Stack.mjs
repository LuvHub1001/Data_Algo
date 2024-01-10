/*
    Stack의 추상자료형
    데이터 삽입(push)
    데이터 제거(pop)
    데이터 참조(peek)
    비었는지 체크(isEmpty)
*/

import { LinkedList } from "./LinkedList.mjs";

class Stack {
  constructor() {
    this.list = new LinkedList();
  }

  // 삽입
  push(data) {
    this.list.insertAt(0, data);
  }

  // 제거
  pop() {
    try {
      // 제거된 노드 반환
      return this.list.deleteAt(0);
    } catch (e) {
      // 빈 리스트를 지웠을 때 예외처리
      return null;
    }
  }

  peek() {
    return this.list.getNodeAt(0);
  }

  isEmpty() {
    return this.list.count === 0;
  }
}
export { Stack };
