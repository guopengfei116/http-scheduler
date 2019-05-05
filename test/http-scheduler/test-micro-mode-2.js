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
  mode: 'micro',
});

/**
 * micro模式：
 *  请求不会立即发出，而是以微任务为单位对请求按权重执行，以保证一连串请求的先后顺序。
 *  下面的请求有两个微任务，第一个微任务的请求会先进入等待队列，然后按权重执行 8&7,
 *  然后第二个微任务的请求进入等待队列按权重执行，依次为 10&9，6&5，4&3，2&1 0&-1 -2
 *  最后第二个宏任务请求入队，按权重执行依次为 13&12 11&-3
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

setTimeout(() => {
  httpScheduler.schedule(-3, new HttpProxy(-3, 'DDDD'));
  httpScheduler.schedule(12, new HttpProxy(12, 'LLLL'));
  httpScheduler.schedule(11, new HttpProxy(11, 'kkkk'));
  httpScheduler.schedule(13, new HttpProxy(13, 'MMMM'));
}, 0);

httpScheduler.schedule(-1, new HttpProxy(-1, 'BBBB'));
httpScheduler.schedule(8, new HttpProxy(8, 'hhhh'));
