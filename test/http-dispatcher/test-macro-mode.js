import axios from 'axios';
import HttpDispatcher from '../../src/http-dispatcher';
import httpDispatchHelper from '../test-common-helper/http-dispatch-helper';

const httpDispatcher = new HttpDispatcher({
  httpEngine: axios,
  concurrentMax: 2,
  mode: 'macro',
});

// 前两个一定为 7&6，后面的进入同一个宏任务队列
const commonHttpCase = httpDispatchHelper(httpDispatcher);
commonHttpCase(3).then(() => console.log(3));
commonHttpCase(7).then(() => console.log(7));
commonHttpCase(2).then(() => console.log(2));
commonHttpCase(4).then(() => console.log(4));

Promise.resolve().then(() => {
  commonHttpCase(5).then(() => console.log(5));
  commonHttpCase(6).then(() => console.log(6));
});

setTimeout(() => {
  commonHttpCase(8).then(() => console.log(8));
  commonHttpCase(1).then(() => console.log(1));
}, 0);

// 取消功能测试用例
setTimeout(() => {
  const task10 = commonHttpCase(10);
  task10.then(() => console.log(10));
  task10.abort();
}, 0);
