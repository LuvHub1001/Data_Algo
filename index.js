const a = 87;
const b = 70;
const c = 100;
const d = 55; // 추가됐을 때?
const average = (a + b + c + d) / 4; // 변수를 추가하고 계산하는 코드 수정해야함 (일반 변수 처리 방법)

const arr = [87, 70, 100, 55];
const averageArr = arr.reduce((a, b) => a + b, 0) / arr.length; // 배열에 데이터만 넣으면 평균 구함.(배열의 처리 방법)

let str = "테스트";
console.log(str);
