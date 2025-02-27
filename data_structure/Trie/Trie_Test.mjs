import { Trie } from "./trie.mjs";

let trie = new Trie();

trie.insert("고등어");
trie.insert("김치");
trie.insert("김치찜");
trie.insert("김치찌개");

// console.log("======== 두부 ========");
// console.log(trie.search("두부"));

// console.log("======== 김치 ========");
// console.log(trie.search("김치"));

// console.log("======== 모든 단어 검색 ========");
// console.log(trie.getAllWords());

// console.log("======== 자동완성 ========");
// console.log(trie.autoComplete("김"));

trie.search("김치찌개", true);
trie.search("김치찌개", true);
trie.search("김치", true);
trie.search("김치", true);
trie.search("김치", true);
trie.search("김치", true);
trie.search("김치", true);
trie.search("김치", true);
trie.search("김치", true);
trie.search("김치", true);
trie.search("김치", true);
trie.search("김치", true);
trie.search("김치", true);
trie.search("김치찜", true);

console.log(trie.autoCompleteByCount("김치"));
