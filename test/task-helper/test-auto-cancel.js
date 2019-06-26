import axios from 'axios';
import HttpScheduler, { taskHelper } from '../../src/main';
import httpDispatchHelper from '../test-common-helper/http-dispatch-helper';

const httpScheduler = new HttpScheduler({
  httpEngine: axios,
  mode: 'normal',
});
const httpDispatch = httpDispatchHelper(httpScheduler);

/**
 * 预期case1和2的成功回调执行了一次，case3和4执行多次。
 */
const testCase = {
  case1: () => taskHelper.autoCancel(httpDispatch(3)).then(() => console.log(3)),
  case2: () => taskHelper.autoCancel(httpDispatch(7)).then(() => console.log(7)),
  case3: () => httpDispatch(2).then(() => console.log(2)),
  case4: () => httpDispatch(4).then(() => console.log(4)),
}

testCase.case1();
testCase.case1();
testCase.case1();
testCase.case1();

testCase.case2();
testCase.case2();
testCase.case2();
testCase.case2();

testCase.case3();
testCase.case3();
testCase.case3();
testCase.case3();

testCase.case4();
testCase.case4();
testCase.case4();
testCase.case4();
