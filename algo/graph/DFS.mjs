class Vertex {
  constructor(value) {
    this.value = value;
    this.adjacent_verticies = [];
  }

  addAdjacentVertex(vertex) {
    this.adjacent_verticies.push(vertex);
  }

  removeAdjacentVertex(vertex) {
    for (let i = 0; i < this.adjacent_verticies.length; i++) {
      if (this.adjacent_verticies[i] === vertex)
        this.adjacent_verticies.splice(i--, 1);
    }
  }
}

function DFS(vertex, visited_vertices = {}) {
  // 현재 정점을 방문했던 정점 저장하는 해시테이블에 저장함
  visited_vertices[vertex.value] = true;

  console.log(`정점: ${vertex.value}`);

  for (let adjacent of vertex.adjacent_verticies) {
    if (visited_vertices[adjacent.value] === true) {
      continue;
    } else {
      DFS(adjacent, visited_vertices);
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

// Ben을 대상으로 DFS 수행
DFS(ben);
