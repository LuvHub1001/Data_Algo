/**
 * 버블정렬: 앞에 있는 숫자와 옆에 숫자를 비교해서 자리를 바꾸는 알고리즘
 * cf) 만약 원소가 4개 존재한다면, 자리 교체 비교는 최대 3번
 *
 * 장점: 이해와 구현 간단
 * 단점: 성능 O(n^2) 좋지않음
 */

function bubble_sort(arr) {
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}

console.log(bubble_sort([3, 2, 1, 4]));
