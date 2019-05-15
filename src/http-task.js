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

  async exec() {
    if (this.isRepeal) return;

    try {
      const response = await this.httpEngine[this.method](...this.params);
      if (!this.isRepeal) this.resolve(response);
    } catch (e) {
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
