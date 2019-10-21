export default class Task {

  isRepeal = false;

  constructor(handler) {
    this.handler = handler;
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }

  async exec(next) {
    if (this.isRepeal) {
      next(false);
      return;
    }

    try {
      const result = await this.handler();
      next(true);
      if (!this.isRepeal) this.resolve(result);
    } catch (e) {
      next(false);
      if (!this.isRepeal) this.reject(e);
    }
  }

  abort() {
    this.isRepeal = true;
  }

  getPromise() {
    return this.promise;
  }

};
