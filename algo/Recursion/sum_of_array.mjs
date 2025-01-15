function sumArray(arr) {
  if (arr.length === 0) return 0;
  return sumArray(arr.slice(0, -1)) + arr[arr.length - 1];
}

const quesArr = [1, 2, 3, 4, 5, 6];
console.log(sumArray(quesArr));
