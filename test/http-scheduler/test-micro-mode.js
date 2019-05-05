import HttpScheduler from '../../src/http-scheduler';
import HttpProxy from './http-proxy';

HttpProxy.mode = 'micro';
const httpScheduler = new HttpScheduler({
  concurrentMax: 2,
  mode: 'micro',
});

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
httpScheduler.schedule(2, new HttpProxy(2, 'bbbb'));
httpScheduler.schedule(4, new HttpProxy(4, 'dddd'));
httpScheduler.schedule(1, new HttpProxy(1, 'aaaa'));
httpScheduler.schedule(3, new HttpProxy(3, 'cccc'));

Promise.resolve().then(() => {
  httpScheduler.schedule(-2, new HttpProxy(-2, 'CCCC'));
  httpScheduler.schedule(10, new HttpProxy(10, 'jjjj'));
  httpScheduler.schedule(9, new HttpProxy(9, 'iiii'));
});

httpScheduler.schedule(5, new HttpProxy(5, 'eeee'));
httpScheduler.schedule(0, new HttpProxy(0, 'AAAA'));
httpScheduler.schedule(6, new HttpProxy(6, 'ffff'));
httpScheduler.schedule(7, new HttpProxy(7, 'gggg'));

httpScheduler.schedule(-1, new HttpProxy(-1, 'BBBB'));
httpScheduler.schedule(8, new HttpProxy(8, 'hhhh'));
