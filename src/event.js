export default class EventMicro {

  listenerStore = {};
  tasksRegister = {};

  // params { Enum('normal', 'micro', 'macro') } mode
  constructor(mode = 'micro') {
    this.mode = mode;
  }

  dispatchEvent(type) {
    // Dispatch is synchronous
    if (this.mode === 'normal') {
      this.immediatelyDispatchEvent(type);
      return;
    }

    // Dispatch is asynchronous
    if (!this.tasksRegister[type]) {
      if (this.mode === 'micro') {
        this.tasksRegister[type] = Promise.resolve().then(() => {
          this.immediatelyDispatchEvent(type);
          this.tasksRegister[type] = null;
        });
      } else if (this.mode === 'macro') {
        this.tasksRegister[type] = setTimeout(() => {
          this.immediatelyDispatchEvent(type);
          this.tasksRegister[type] = null;
        }, 0);
      }
    }
  }

  immediatelyDispatchEvent(type) {
    const listeners = this.listenerStore[type];
    if (Array.isArray(listeners)) {
      listeners.forEach(listener => listener());
    }
  }

  addListener(type, listener) {
    const listeners = this.listenerStore[type];
    if (Array.isArray(listeners)) listeners.push(listener);
    else this.listenerStore[type] = [listener];
  }

  removeEventListener(type, listener) {
    if (!this.listenerStore[type]) return;

    if (!listener) {
      this.listenerStore[type] = null;
    } else {
      this.listenerStore[type] = this.listenerStore[type].filter(item => item !== listener);
    }
  }

}
