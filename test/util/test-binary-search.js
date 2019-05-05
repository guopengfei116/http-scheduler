import { binarySearch } from '../../src/util';

// 普通值
const arr = [1, 3, 3, 3, 5, 7, 7, 8, 9];

// 重复向右
const testCase = [
  [0, -Infinity],
  [1, 0],
  [2, 0],
  [3, 3],
  [4, 3],
  [5, 4],
  [6, 4],
  [7, 6],
  [8, 7],
  [9, 8],
  [10, Infinity],
];

testCase.forEach(item => {
  const result = binarySearch(arr, item[0]);
  console.log(`预期：${item[1]}，实际：${result.index}，结果：${result.index === item[1]}`);
});

// 重复向左
const testCase2 = [
  [0, -Infinity],
  [1, 0],
  [2, 0],
  [3, 1],
  [4, 3],
  [5, 4],
  [6, 4],
  [7, 5],
  [8, 7],
  [9, 8],
  [10, Infinity],
];

testCase2.forEach(item => {
  const result = binarySearch(arr, item[0], 0, arr.length - 1, false);
  console.log(`预期：${item[1]}，实际：${result.index}，结果：${result.index === item[1]}`);
});
