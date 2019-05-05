export default class HttpProxy {

  static mode = 'micro';

  constructor(priority, url) {
    this.priority = priority;
    this.url = url;
  }

  send() {
    if (HttpProxy.mode === 'micro') {
      return Promise.resolve().then(() => {
        console.log(`执行：${this.url}, 优先级: ${this.priority}`);
      });
    }
    
    if (HttpProxy.mode === 'macro') {
      return new Promise(resolve => {
        setTimeout(() => {
          console.log(`执行：${this.url}, 优先级: ${this.priority}`);
          resolve();
        }, 0);
      });
    }
  }
}
