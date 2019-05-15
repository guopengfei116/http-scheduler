import Scheduler from './scheduler';
import HttpTask from './http-task';

export default class HttpDispatcher {

  constructor(config) {
    const { httpEngine, ...arg } = config;
    this.httpEngine = httpEngine;
    this.scheduler = new Scheduler(arg);
  }

  dispatch(priority, method, ...params) {
    const httpTask = new HttpTask(this.httpEngine, method, params);
    this.scheduler.schedule(priority, httpTask);
    return httpTask;
  }

};
