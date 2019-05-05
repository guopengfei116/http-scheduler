import { binarySearch } from '../../src/util';

// 测试数据，元素为复杂对象，在比较时需要用到hook
const testData = [
  {val: 1},
  {val: 3},
  {val: 3},
  {val: 3},
  {val: 5},
  {val: 7},
  {val: 7},
  {val: 8},
  {val: 9},
];

// 取值hook
const valueHook = item => item && item.val;

// 测试用例
const testCase = [
  { findVal: 0, output: -Infinity },
  { findVal: 1, output: 0 },
  { findVal: 2, output: 0 },
  { findVal: 3, output: 1 },
  { findVal: 4, output: 3 },
  { findVal: 5, output: 4 },
  { findVal: 6, output: 4 },
  { findVal: 7, output: 5 },
  { findVal: 8, output: 7 },
  { findVal: 9, output: 8 },
  { findVal: 10, output: Infinity },
];

testCase.forEach(item => {
  const result = binarySearch(testData, item.findVal, 0, testData.length - 1, false, valueHook);
  console.log(`预期：${item.output}，实际：${result.index}，结果：${result.index === item.output}`);
});
