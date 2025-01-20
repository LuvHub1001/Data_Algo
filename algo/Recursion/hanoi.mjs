/**
 * hanoi(3, "A", "C", "B");
 * 3: 원반 개수
 * A: 시작 위치
 * C: 도착 위치
 * B: 임시로 사용할 기둥
 */

function hanoi(count, from, to, temp) {
  if (count === 0) return;

  hanoi(count - 1, from, temp, to); // 원반 1,2가 A기둥에서 시작해서 B기둥으로 도착할 때 C기둥을 임시로 사용함.
  console.log(`원반 ${count}를 ${from}에서 ${to}로 이동`);
  hanoi(count - 1, temp, to, from); // 원반 1,2가 B기둥에서 시작해서 C기둥으로 도착할 때 A기둥을 임시로 사용함.
}

hanoi(3, "A", "C", "B");
