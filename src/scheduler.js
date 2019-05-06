import QueuePriority from './queue-priority';
import Event from './event';

export default class Scheduler extends Event {

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
        const task = this.queuePriority.dequeue();
        await task.exec();
        this.addListener('schedule', listener);

        // console.log(this.queuePriority.queue.length);
        // console.log(this.listenerStore);
        if (!this.queuePriority.isEmpty()) this.dispatchEvent('schedule');
      };
      this.addListener('schedule', listener);
    });
  }

  schedule(priority, task) {
    this.queuePriority.enqueue(priority, task);
    this.dispatchEvent('schedule');
  }

};
