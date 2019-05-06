import Scheduler from '../../src/scheduler';
import Task from './task';

/**
 * 实际的http请求是macro模式的，
 * 这里为了更清晰的测试结果改为micro模式，
 * 如需真实的运行情况自行修改
 */
Task.mode = 'micro';

const scheduler = new Scheduler({
  concurrentMax: 2,
  mode: 'normal',
});

/**
 * normal模式：
 *  请求会立即发出，当请求达到并发限制后会进入等待队列按权重执行，最大限度利用闲余时间。
 *  下面请求，因为最大并发数为2，第一个微任务的前两个请求 2&4 立即执行，
 *  然后剩余请求进入等待队列，接着第二个微任务的请求也进入等待队列，
 *  后续请求从队列里按权取出执行，依次为 10&9 8&7，6&5，3&1，0&-1 -2
 *  最后第二个宏任务请求入队，重复上诉流程，先按序执行 -3&12, 然后按权重执行 13&11
 */
scheduler.schedule(2, new Task(2, 'bbbb'));
scheduler.schedule(4, new Task(4, 'dddd'));
scheduler.schedule(1, new Task(1, 'aaaa'));
scheduler.schedule(3, new Task(3, 'cccc'));

Promise.resolve().then(() => {
  scheduler.schedule(-2, new Task(-2, 'CCCC'));
  scheduler.schedule(10, new Task(10, 'jjjj'));
  scheduler.schedule(9, new Task(9, 'iiii'));
});

scheduler.schedule(5, new Task(5, 'eeee'));
scheduler.schedule(0, new Task(0, 'AAAA'));
scheduler.schedule(6, new Task(6, 'ffff'));
scheduler.schedule(7, new Task(7, 'gggg'));

setTimeout(() => {
  scheduler.schedule(-3, new Task(-3, 'DDDD'));
  scheduler.schedule(12, new Task(12, 'LLLL'));
  scheduler.schedule(11, new Task(11, 'kkkk'));
  scheduler.schedule(13, new Task(13, 'MMMM'));
}, 0);

scheduler.schedule(-1, new Task(-1, 'BBBB'));
scheduler.schedule(8, new Task(8, 'hhhh'));
