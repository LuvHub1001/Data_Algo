/**
 * 선택정렬: 배열의 정렬되지 않은 영역의 첫 번째 원소 ~ 마지막 원소 비교 후 최소값을 첫 번째 원소로 가져옴.
 * cf) 바깥쪽 for문이 실행될수록 안쪽 for문이 줄어드는 형태
 *
 * 장점: 이해와 구현 간단
 * 단점: 성능 O(n^2) 좋지않음
 */

function selection_sort(arr) {
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let minValueIndex = i;

    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minValueIndex]) {
        minValueIndex = j;
      }
    }

    let temp = arr[i];
    arr[i] = arr[minValueIndex];
    arr[minValueIndex] = temp;
  }

  return arr;
}

console.log(selection_sort([4, 2, 1, 3]));
