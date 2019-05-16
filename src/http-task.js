export default class HttpTask {

  isRepeal = false;

  constructor(httpEngine, method, params) {
    this.httpEngine = httpEngine;
    this.method = method;
    this.params = params;

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
      const response = await this.httpEngine[this.method](...this.params);
      next(!this.isRepeal);
      if (!this.isRepeal) this.resolve(response);
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
