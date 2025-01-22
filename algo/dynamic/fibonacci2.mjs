function fibonacci(n) {
  if (n === 0 || n === 1) return n;
  let table = [0, 1];

  for (let i = 2; i <= n; i++) {
    table[i] = table[i - 2] + table[i - 1];
  }
  return table[n];
}

let start = new Date();
console.log(fibonacci(40));
let end = new Date();
console.log(`fibonacci 함수 실행시간: ${end - start}ms`);
