class WeightedGraphVertex {
  constructor(value) {
    this.value = value;
    this.adjacent_vertecies = {};
  }

  addAdjacentVertex(vertex, weight) {
    // key는 vertex의 value (지역의 이름)
    // value는 가중치(weight)가 됨
    this.adjacent_vertecies[vertex.value] = weight;
  }

  removeAdjacentVertex(vertex) {
    // 해당 해시테이블에서 Key(지역명)으로 제거
    delete this.adjacent_vertecies[vertex.value];
  }
}

let seoul = new WeightedGraphVertex("서울");
let wonju = new WeightedGraphVertex("원주");
let gangneung = new WeightedGraphVertex("강릉");
let daejeon = new WeightedGraphVertex("대전");
let jeonju = new WeightedGraphVertex("전주");
let daegu = new WeightedGraphVertex("대구");

seoul.addAdjacentVertex(wonju, 87);
seoul.addAdjacentVertex(daejeon, 140);
seoul.addAdjacentVertex(jeonju, 187);

console.log(seoul.adjacent_vertecies);

seoul.removeAdjacentVertex(jeonju);

console.log(seoul.adjacent_vertecies);
