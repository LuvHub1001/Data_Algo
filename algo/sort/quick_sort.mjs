/**
 * 1. 정렬하기 전 배열에 있는 숫자 중 하나를 '피벗'으로 설정
 * 2. left: 0번 인덱스, right: 8번 인덱스
 * 3. 피벗을 제외한 배열의 양쪽에서 값을 비교하기 위한 변수 > leftStartIdx: 1번 인덱스, rightStartIdx: 8번 인덱스
 * 4. leftStartIdx는 오른쪽으로 이동하다가 피벗보다 큰 값 만나면 멈춤
 * 5. rightStartIdx는 왼쪽으로 이동하다가 피벗보다 작은 값 만나면 멈춤
 * 6. 둘 다 멈추면 값을 서로 교환해줌
 * 7. 서로 지나쳤다면 멈춤. (=leftStartIdx가 rightStartIdx의 오른쪽에 있고 rightStartIdx가 leftStartIdx의 왼쪽에 있음)
 * 8. 피벗과 rightStartIdx의 값을 교환
 *
 * 평균 성능: 0(nlogn)
 * 최악 성능(=피벗이 한쪽에 쏠리는 경우): O(n^2)
 * :: 퀵 정렬이 병합 정렬보다 더 적은 비교와 적은 메모리 공간 차지
 */

function quick_sort(arr, left, right) {
  // left가 더 크면 배열의 범위가 정상적이지 않음
  if (left <= right) {
    let pivot = divide(arr, left, right);
    quick_sort(arr, left, pivot - 1);
    quick_sort(arr, pivot + 1, right);
  }
}

// 정렬된 피벗의 위치 리턴
function divide(arr, left, right) {
  let pivot = arr[left];
  let leftStartIdx = left + 1;
  let rightStartIdx = right;

  while (leftStartIdx <= rightStartIdx) {
    while (leftStartIdx <= right && pivot >= arr[leftStartIdx]) {
      leftStartIdx++;
    }

    while (rightStartIdx >= left + 1 && pivot <= arr[rightStartIdx]) {
      rightStartIdx--;
    }

    if (leftStartIdx <= rightStartIdx) {
      swap(arr, leftStartIdx, rightStartIdx);
    }
  }

  swap(arr, left, rightStartIdx);
  return rightStartIdx;
}

function swap(arr, idx1, idx2) {
  let temp = arr[idx1];
  arr[idx1] = arr[idx2];
  arr[idx2] = temp;
}

let quesArr = [5, 3, 7, 2, 6, 4, 9, 1, 8];
quick_sort(quesArr, 0, quesArr.length - 1);
console.log(quesArr);
