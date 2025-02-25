import { Heap } from "./Heap.mjs";

let heap = new Heap();

heap.insert(4);
heap.insert(2);
heap.insert(5);
heap.insert(7);
heap.insert(1);

heap.root.inOrderTraversal(heap.root);
console.log(heap.root.getData());

console.log("======== remove ========");
console.log(heap.remove());
console.log(heap.remove());
console.log(heap.remove());
console.log(heap.remove());
