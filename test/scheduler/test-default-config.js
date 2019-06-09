import Scheduler from '../../src/scheduler';
import Task from './task';

/**
 * 实际的http请求是macro模式的，
 * 这里为了更清晰的测试结果改为micro模式，
 * 如需真实的运行情况自行修改
 */
Task.mode = 'micro';

// 默认concurrentMax为4
// 默认mode为micro模式
const scheduler = new Scheduler();

/**
 * micro模式：
 *  请求不会立即发出，而是以微任务为单位对请求按权重执行，以保证一连串请求的先后顺序。
 *  下面的请求有两个微任务，第一个微任务的请求会先进入等待队列，然后按权重执行 8&7,
 *  然后第二个微任务的请求进入等待队列按权重执行，依次为 10&9，6&5，4&3，2&1 0&-1 -2
 *
 * 特点：
 *  在请求闲余时，对当前微任务的请求按权重排序后执行。
 *
 * 优缺点：
 *  保证一连串请求的执行优先级，但是如果有长时间运行的计算代码，可能会浪费请求时间。
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

scheduler.schedule(-1, new Task(-1, 'BBBB'));
scheduler.schedule(8, new Task(8, 'hhhh'));
