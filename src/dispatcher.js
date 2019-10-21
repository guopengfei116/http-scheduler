import Scheduler from './scheduler';
import Task from './task';

export default class Dispatcher {

  static defaultConfig = {};

  constructor(config) {
    config = {...this.defaultConfig, ...config};
    this.scheduler = new Scheduler(config);
  }

  static setBaseConfig(config) {
    this.defaultConfig = Object.assign(this.defaultConfig, config);
  }

  static wrapPromise(task) {
    const p = task.getPromise();
    ['then', 'catch', 'finally'].forEach(method => {
      task[method] = p[method].bind(p);
    });
    return task;
  }

  dispatch(handler, priority) {
    const task = new Task(handler);
    this.scheduler.schedule(priority, task);
    return Dispatcher.wrapPromise(task);
  }

};
