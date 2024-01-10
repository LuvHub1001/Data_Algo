import { Queue } from "./Queue.mjs";

let queue = new Queue();

console.log("========= enqueue() 출력 =========");
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
queue.enqueue(4);

console.log(queue.front().data);

console.log("========= dequeue() 출력 =========");
console.log(queue.dequeue().data);
console.log(queue.dequeue().data);
console.log(queue.dequeue().data);
console.log(queue.dequeue().data);

console.log(`isEmpty ? ${queue.isEmpty()}`);
