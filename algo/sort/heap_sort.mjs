import { Heap } from "../../data_structure/PriorityQueue/Heap.mjs";

// 오름차순 정렬: 최소힙 이용
// 내림차순 정렬: 최대힙 이용

class MyData {
  constructor(data) {
    this.data = data;
    this.priority = data;
  }
}

let heap = new Heap();

heap.insert(new MyData(2));
heap.insert(new MyData(8));
heap.insert(new MyData(5));
heap.insert(new MyData(6));
heap.insert(new MyData(10));
heap.insert(new MyData(4));
heap.insert(new MyData(3));
heap.insert(new MyData(7));
heap.insert(new MyData(9));
heap.insert(new MyData(1));

let arr = [];

arr.push(heap.remove().getData());
arr.push(heap.remove().getData());
arr.push(heap.remove().getData());
arr.push(heap.remove().getData());
arr.push(heap.remove().getData());
arr.push(heap.remove().getData());
arr.push(heap.remove().getData());
arr.push(heap.remove().getData());
arr.push(heap.remove().getData());
arr.push(heap.remove().getData());

console.log(...arr);
