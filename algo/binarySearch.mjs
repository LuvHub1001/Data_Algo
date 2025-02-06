/**
 *
 * @param {배열} arr
 * @param {찾는 값} target
 * @param {배열 시작 인덱스} start
 * @param {배열 끝 인덱스} end
 */
function binarySearch(arr, target, start, end) {
  arr.sort((a, b) => a - b, 0);

  if (start > end) {
    return null;
  }

  let mid = Math.floor((start + end) / 2);

  if (arr[mid] === target) {
    return mid;
  } else if (arr[mid] < target) {
    return binarySearch(arr, target, mid + 1, end);
  } else {
    return binarySearch(arr, target, start, mid - 1);
  }
}

const quesArr = [65, 98, 37, 16, 23, 54, 32];
let idx = binarySearch(quesArr, 37, 0, quesArr.length - 1);
console.log(idx);
