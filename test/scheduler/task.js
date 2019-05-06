export default class Task {

  static mode = 'micro';

  constructor(priority, name) {
    this.priority = priority;
    this.name = name;
  }

  exec() {
    if (Task.mode === 'micro') {
      return Promise.resolve().then(() => {
        console.log(`执行：${this.name}, 优先级: ${this.priority}`);
      });
    }

    if (Task.mode === 'macro') {
      return new Promise(resolve => {
        setTimeout(() => {
          console.log(`执行：${this.name}, 优先级: ${this.priority}`);
          resolve();
        }, 0);
      });
    }
  }
}
