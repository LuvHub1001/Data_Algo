function power(x, n) {
  // 밑:x
  // 지수:n
  if (n === 0) return 1;
  return power(x, n - 1) * x;
}

console.log(power(3, 3));
