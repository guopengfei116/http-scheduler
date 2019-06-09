import QueuePriority from './queue-priority';
import Event from './event';

export default class Scheduler extends Event {

  static concurrentMax = 4;
  queuePriority = new QueuePriority();

  constructor(config = {}) {
    const { concurrentMax, mode } = config;
    super(mode);

    this.concurrentMax = concurrentMax || Scheduler.concurrentMax;
    this.init();
  }

  init() {
    [...Array(this.concurrentMax).keys()].forEach((id) => {
      const executant = () => {
        if (this.queuePriority.isEmpty()) return;
        // console.log(this.listenerStore);
        this.removeEventListener('schedule', executant);
        const task = this.queuePriority.dequeue();
        task.exec(() => {
          this.addListener('schedule', executant);
          if (!this.queuePriority.isEmpty()) this.dispatchEvent('schedule');
        });
      };
      executant.$_id = id;
      this.addListener('schedule', executant);
    });
  }

  schedule(priority, task) {
    this.queuePriority.enqueue(priority, task);
    this.dispatchEvent('schedule');
  }

};
