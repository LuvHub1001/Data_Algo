// 정점 클래스
class Vertex {
  constructor(value) {
    this.value = value;
    this.adjacent_vertices = []; // 인접할 정점 저장할 배열
  }

  // 다른 정점 연결 함수
  addAdjacentVertex(vertex) {
    this.adjacent_vertices.push(vertex);
  }

  // 연결한 정점 끊는 함수
  removeAdjacentVertex(vertex) {
    for (let i = 0; i < this.adjacent_vertices.length; i++) {
      if (this.adjacent_vertices[i] === vertex) {
        this.adjacent_vertices.splice(i--, 1);
      }
    }
  }
}

let jake = new Vertex("Jake");
let ben = new Vertex("Ben");
let joy = new Vertex("Joy");
let ivy = new Vertex("Ivy");
let elin = new Vertex("Elin");
let anna = new Vertex("Anna");
let david = new Vertex("David");

// Jake는 Ben만 Follow
jake.addAdjacentVertex(ben);
// Ben은 Jake만
ben.addAdjacentVertex(jake);

// Joy는 Ben과 Ivy Follow
joy.addAdjacentVertex(ben);
joy.addAdjacentVertex(ivy);

// Ivy는 Joy와 Ben Follow
ivy.addAdjacentVertex(joy);
ivy.addAdjacentVertex(ben);

// Ellin은 Ivy와 Anna Follow
elin.addAdjacentVertex(ivy);
elin.addAdjacentVertex(anna);

// Anna는 Ben, David, Elin, Follow
anna.addAdjacentVertex(ben);
anna.addAdjacentVertex(david);
anna.addAdjacentVertex(elin);

// david는 Anna Follow
david.addAdjacentVertex(anna);

// Anna의 팔로우 목록 확인
console.log(anna.adjacent_vertices);

// Anna가 david Unfollow 후 목록 확인
anna.removeAdjacentVertex(david);
console.log(anna.adjacent_vertices);
