import { Queue } from "./Queue.mjs";

class Vertex {
  constructor(value) {
    this.value = value;
    this.adjacent_vertecies = [];
  }

  addAdjacentVertex(vertex) {
    this.adjacent_vertecies.push(vertex);
  }

  removeAdjacentVertex(vertex) {
    for (let i = 0; this.adjacent_vertecies.length; i++) {
      if (this.adjacent_vertecies[i] === vertex) {
        this.adjacent_vertecies.splice(i--, 1);
      }
    }
  }
}

function BFS(vertex) {
  let queue = new Queue();
  let visited_vertecies = [];

  // 최초 시작 정점을 해시테이블에 저장하는 역할
  visited_vertecies[vertex.value] = true;
  queue.enqueue(vertex);

  while (queue.isEmpty() === false) {
    let currentVertex = queue.dequeue().data;
    console.log(`정점 : ${currentVertex.value}`);

    // 현재 정점의 인접 정점을 순회하는 역할
    for (let adjacent of currentVertex.adjacent_vertecies) {
      if (visited_vertecies[adjacent.value]) continue;
      else {
        visited_vertecies[adjacent.value] = true;
        queue.enqueue(adjacent);
      }
    }
  }
}

let ben = new Vertex("Ben");
let ivy = new Vertex("Ivy");
let joy = new Vertex("Joy");
let jake = new Vertex("Jake");
let anna = new Vertex("Anna");
let david = new Vertex("David");
let elin = new Vertex("Elin");
let owen = new Vertex("Owen");

ben.addAdjacentVertex(ivy);
ben.addAdjacentVertex(jake);
ben.addAdjacentVertex(anna);
ben.addAdjacentVertex(david);

ivy.addAdjacentVertex(ben);
ivy.addAdjacentVertex(joy);

joy.addAdjacentVertex(ivy);
joy.addAdjacentVertex(jake);

jake.addAdjacentVertex(ben);
jake.addAdjacentVertex(joy);

anna.addAdjacentVertex(ben);

david.addAdjacentVertex(ben);
david.addAdjacentVertex(elin);

elin.addAdjacentVertex(david);
elin.addAdjacentVertex(owen);

owen.addAdjacentVertex(elin);

// Ben을 대상으로 BFS 수행
BFS(ben);
