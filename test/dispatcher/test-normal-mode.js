import Dispatcher from '../../src/dispatcher';
import dispatchHelper from '../test-common-helper/dispatch-helper';

const dispatcher = new Dispatcher({
  concurrentMax: 2,
  mode: 'normal',
});

// 前两个一定为 3&7，后面的进入同一个宏任务队列
const commonHttpCase = dispatchHelper(dispatcher);
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
