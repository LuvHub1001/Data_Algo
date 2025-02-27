import { Heap } from "./Heap.mjs";

class Node {
  constructor() {
    this.children = {};
  }
}

class Trie {
  constructor() {
    this.root = new Node();
  }

  insert(word) {
    let currentNode = this.root;

    for (let char of word) {
      if (currentNode.children[char]) {
        currentNode = currentNode.children[char];
      } else {
        let newNode = new Node();
        currentNode.children[char] = newNode;
        currentNode = newNode;
      }
    }

    currentNode.children["*"] = 0;
  }

  search(word, isCounting = false) {
    let currentNode = this.root;

    for (let char of word) {
      if (currentNode.children[char]) {
        currentNode = currentNode.children[char];
      } else return null;
    }

    if (isCounting) currentNode.children["*"]++;

    return currentNode;
  }

  // 해당 노드부터 시작해서 하위 모든 노드를 순회하며 단어 출력하는 함수(재귀)
  getAllWords(startNode = null, word = "", words = []) {
    let currentNode = this.root;

    if (startNode) currentNode = startNode;

    for (let key in currentNode.children) {
      let childNode = currentNode.children[key];
      if (key === "*") {
        words.push(new WordData(word, childNode));
      } else {
        this.getAllWords(childNode, word + key, words);
      }
    }

    return words;
  }

  autoComplete(word) {
    let currentNode = this.search(word);
    if (currentNode === null) return null;

    return this.getAllWords(currentNode, word);
  }

  // 최대힙 사용하여 검색 횟수 많은 순으로 정렬
  autoCompleteByCount(word) {
    let heap = new Heap();
    let words = this.autoComplete(word);
    heap.isBigPriority = function (first, second) {
      return first.priority > second.priority;
    };

    for (let word of words) {
      heap.insert(word);
    }

    let sortedBySearchCount = [];
    do {
      let removed = heap.remove();
      if (removed === null) break;
      else sortedBySearchCount.push(removed);
    } while (true);

    return sortedBySearchCount;
  }
}

class WordData {
  constructor(word, count) {
    this.word = word;
    this.count = count;
    this.priority = count;
  }
}

export { Trie };
