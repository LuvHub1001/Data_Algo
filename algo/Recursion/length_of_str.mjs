function strLength(str) {
  if (str.length === 0) return 0;
  return strLength(str.slice(0, -1)) + 1;
}

console.log(strLength("abcde"));
