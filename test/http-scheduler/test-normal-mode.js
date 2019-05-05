import HttpScheduler from '../../src/http-scheduler';
import HttpProxy from './http-proxy';

/**
 * 实际的http请求是macro模式的，
 * 这里为了更清晰的测试结果改为micro模式，
 * 如需真实的运行情况自行修改
 */
HttpProxy.mode = 'micro';

const httpScheduler = new HttpScheduler({
  concurrentMax: 2,
  mode: 'normal',
});

/**
 * normal模式：
 *  请求会立即发出，当请求达到并发限制后会进入等待队列按权重执行，最大限度利用闲余时间。
 *  下面请求，因为最大并发数为2，第一个微任务的前两个请求 2&4 立即执行，
 *  然后剩余请求进入等待队列，接着第二个微任务的请求也进入等待队列，
 *  后续请求从队列里按权取出执行，依次为 10&9 8&7，6&5，3&1，0&-1 -2
 * 
 * 特点：
 *  在请求闲余时立即执行，达到请求最大数量后排队。
 * 
 * 优缺点：
 *  充分利用闲余时间，但是每个微任务中的请求权重只能在下一次生效。
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
