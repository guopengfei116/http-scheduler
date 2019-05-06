export default class HttpTask {

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
    try {
      const response = await this.httpEngine[this.method](...this.params);
      this.resolve(response);
      return true;
    } catch (e) {
      this.reject(e);
      return false;
    }
  }

  getPromise() {
    return this.promise;
  }

};
