import { Heap } from "./Heap.mjs";

class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
    this.priority = age;
  }
}

let heap = new Heap();

heap.insert(new Person("임꺽정", 20));
heap.insert(new Person("홍길동", 10));
heap.insert(new Person("이순신", 40));

console.log(heap.root.getData());
