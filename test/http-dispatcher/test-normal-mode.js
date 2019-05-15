import axios from 'axios';
import HttpDispatcher from '../../src/http-dispatcher';
import CommonHttpCase from './common-http-case';

const httpDispatcher = new HttpDispatcher({
  httpEngine: axios,
  concurrentMax: 2,
  mode: 'normal',
});

// 前两个一定为 3&7，后面的进入同一个宏任务队列
const commonHttpCase = CommonHttpCase(httpDispatcher);
commonHttpCase(3).getPromise().then(() => console.log(3));
commonHttpCase(7).getPromise().then(() => console.log(7));
commonHttpCase(2).getPromise().then(() => console.log(2));
commonHttpCase(4).getPromise().then(() => console.log(4));

Promise.resolve().then(() => {
  commonHttpCase(5).getPromise().then(() => console.log(5));
  commonHttpCase(6).getPromise().then(() => console.log(6));
});

setTimeout(() => {
  commonHttpCase(8).getPromise().then(() => console.log(8));
  commonHttpCase(1).getPromise().then(() => console.log(1));
}, 0);

// 取消功能测试用例
setTimeout(() => {
  const task10 = commonHttpCase(10);
  task10.getPromise().then(() => console.log(10));
  task10.abort();
}, 0);
