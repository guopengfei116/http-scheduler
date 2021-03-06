import Scheduler from './scheduler';
import HttpTask from './http-task';

export default class HttpDispatcher {

  constructor(config) {
    const { httpEngine, ...arg } = config;
    this.httpEngine = httpEngine;
    this.scheduler = new Scheduler(arg);
  }

  static wrap(task) {
    const p = task.getPromise();
    p.getPromise = task.getPromise.bind(task);
    p.abort = task.abort.bind(task);
    return p;
  }

  static wrapPromise(task) {
    const p = task.getPromise();
    ['then', 'catch', 'finally'].forEach(method => {
      task[method] = p[method].bind(p);
    });
    return task;
  }

  dispatch(priority, method, ...params) {
    const httpTask = new HttpTask(this.httpEngine, method, params);
    this.scheduler.schedule(priority, httpTask);
    // return HttpDispatcher.wrap(httpTask);
    return HttpDispatcher.wrapPromise(httpTask);
  }

};
