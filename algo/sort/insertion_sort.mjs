/**
 * 1. 배열을 두 영역으로 나눠서 진행
 * 2. 정렬되지 않은 영역에서 데이터를 하나씩 꺼내서 정렬된 영역 내 적절한 위치에 삽입하여 정렬
 *
 * 장점: 이해와 구현 간단
 * 단점: 성능 O(n^2) 좋지않음
 */

function insertion_sort(arr) {
  const n = arr.length;

  // 0번째 요소는 정렬되어있다고 가정
  for (let i = 1; i < n; i++) {
    let InsertingData = arr[i];
    let j;
    for (j = i - 1; j >= 0; j--) {
      if (arr[j] > InsertingData) {
        arr[j + 1] = arr[j];
      } else {
        break;
      }
    }
    arr[j + 1] = InsertingData;
  }

  return arr;
}

console.log(insertion_sort([1, 4, 5, 3, 6, 2]));
