import { Heap } from "./Heap.mjs";

class PriorityQueue {
  constructor() {
    this.heap = new Heap();

    // 기존 우선순위 출력 방식 수정하고 싶으면?
    // this.heap.isBigPriority = function (first, second) {
    //   return first.priority > second.priority;
    // };
  }

  // 데이터 삽입
  enqueue(data) {
    this.heap.insert(data);
  }

  // 데이터 제거
  dequeue() {
    return this.heap.remove();
  }
}

class Monster {
  constructor(name, health) {
    this.name = name;
    this.health = health;
    this.priority = health;
  }
}

// 체력 낮은것을 우선순위로 설정 후 출력
let priorityQueue = new PriorityQueue();
priorityQueue.enqueue(new Monster("슬라임", 50));
priorityQueue.enqueue(new Monster("스텀프", 70));
priorityQueue.enqueue(new Monster("리본돼지", 90));

console.log(priorityQueue.dequeue());
console.log(priorityQueue.dequeue());
console.log(priorityQueue.dequeue());
console.log(priorityQueue.dequeue());
