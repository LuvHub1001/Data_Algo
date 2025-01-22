/**
 * Q) 중복된 계산을 하는 경우가 많이 발생함.
 * A) 계산 결과를 저장함으로써 해결 > 같은 계산이 필요할 때 저장된 결과를 사용
 *
 * cf) 메모이제이션은 속도를 위해 메모리(공간) 사용
 */
function fibonacci1(n) {
  if (n === 0 || n === 1) return n;
  return fibonacci1(n - 2) + fibonacci1(n - 1);
}

function fibonacci2(n, memo) {
  if (n === 0 || n === 1) return n;

  if (memo[n] === undefined) {
    memo[n] = fibonacci2(n - 2, memo) + fibonacci2(n - 1, memo);
  }

  return memo[n];
}

let start = new Date();
console.log(fibonacci1(40));
let end = new Date();
console.log(`fibonacci1 실행시간: ${end - start}ms`);

start = new Date();
console.log(fibonacci2(40, {}));
end = new Date();
console.log(`fibonacci2 실행시간: ${end - start}ms`);
