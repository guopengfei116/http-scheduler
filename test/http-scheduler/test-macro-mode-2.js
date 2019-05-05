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
  mode: 'macro',
});

/**
 * macro模式：
 *  下面的请求有两个微任务，但都属于同一个宏任务，所以会一起进入等待队列，
 *  然后在下一次宏任务开始时按权重执行 10&9，接下来第二个宏请求入队，
 *  按权重依次为 13&12 11&8，7&6，5&4，3&2，1&0 -1&-2 -3
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
