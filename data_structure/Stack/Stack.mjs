import { LinkedList } from "./LinkedList.mjs";

/**
 * Stack의 추상자료형
 * 1. push()
 * 2. pop()
 * 3. peek()
 * 4. isEmpty()
 */

class Stack {
  constructor() {
    this.list = new LinkedList();
  }

  push(data) {
    this.list.insertAt(0, data);
  }

  pop() {
    try {
      return this.list.deleteAt(0);
    } catch (e) {
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
