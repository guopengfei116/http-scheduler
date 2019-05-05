/**
 * 设计背景：
 *     一个动态页面的数据可能由N个接口提供，因为浏览器同域的并发限制（通常为4~6个），
 * 这时候就需要考虑哪些请求是必须的，哪些是可延缓的，然后按优先级依次请求，
 * 从而避免优先级高的请求被滞后导致页面主要信息加载不及时的问题。
 *     这时候，如果有一个复杂的页面，考虑和维护这个请求的优先级会浪费大量梳理时间，
 * 那么设计一个规范统一的请求调度类做这件事，会带来更好的开发体验。
 *
 * 设计思路：
 *     解决问题的核心思路是使用优先队列，每个域名请求对应一个队列。
 */
import QueuePriority from './queue-priority';
import Event from './event';

export default class HttpScheduler extends Event {

  queuePriority = new QueuePriority();
  concurrentMax = 4;

  constructor(config) {
    const { concurrentMax, mode } = config;
    super(mode);

    this.concurrentMax = concurrentMax;
    this.init();
  }

  // 创建4个轮回监听器
  init() {
    Array.from(Array(this.concurrentMax)).forEach(() => {
      const listener = async () => {
        if (this.queuePriority.isEmpty()) return;
  
        this.removeEventListener('schedule', listener);
        const http = this.queuePriority.dequeue();
        await http.send();
        this.addListener('schedule', listener);
        
        // console.log(this.queuePriority.queue.length);
        // console.log(this.listenerStore);
        if (!this.queuePriority.isEmpty()) this.dispatchEvent('schedule');
      };
      this.addListener('schedule', listener);
    });
  }

  schedule(priority, http) {
    this.queuePriority.enqueue(priority, http);
    this.dispatchEvent('schedule');
  }

};
