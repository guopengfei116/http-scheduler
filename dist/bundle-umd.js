(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('core-js/modules/web.dom.iterable'), require('core-js/modules/es6.array.iterator'), require('core-js/modules/es6.object.to-string'), require('core-js/modules/es6.promise'), require('regenerator-runtime/runtime')) :
  typeof define === 'function' && define.amd ? define(['exports', 'core-js/modules/web.dom.iterable', 'core-js/modules/es6.array.iterator', 'core-js/modules/es6.object.to-string', 'core-js/modules/es6.promise', 'regenerator-runtime/runtime'], factory) :
  (global = global || self, factory(global.HttpScheduler = {}));
}(this, function (exports) { 'use strict';

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }

    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }

  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
          args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);

        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }

        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }

        _next(undefined);
      });
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }

  function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};

    var target = _objectWithoutPropertiesLoose(source, excluded);

    var key, i;

    if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

      for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
        target[key] = source[key];
      }
    }

    return target;
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    }
  }

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  function binarySearch(arr, findVal) {
    var left = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var right = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : arr.length - 1;
    var repeatToRight = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
    var valueHook = arguments.length > 5 ? arguments[5] : undefined;
    if (left > arr.length - 1) return {
      exist: false,
      index: Infinity
    };
    if (right < 0) return {
      exist: false,
      index: -Infinity
    };
    if (left > right) return {
      exist: false,
      index: right
    };
    var middle = Math.floor(left + (right - left) / 2);

    if ((valueHook ? valueHook(arr[middle]) : arr[middle]) < findVal) {
      return binarySearch(arr, findVal, middle + 1, right, repeatToRight, valueHook);
    } else if ((valueHook ? valueHook(arr[middle]) : arr[middle]) > findVal) {
      return binarySearch(arr, findVal, left, middle - 1, repeatToRight, valueHook);
    } // repeat


    if (repeatToRight && (valueHook ? valueHook(arr[middle + 1]) : arr[middle + 1]) === findVal) {
      return binarySearch(arr, findVal, middle + 1, right, repeatToRight, valueHook);
    } else if (!repeatToRight && (valueHook ? valueHook(arr[middle - 1]) : arr[middle - 1]) === findVal) {
      return binarySearch(arr, findVal, left, middle - 1, repeatToRight, valueHook);
    } else {
      return {
        exist: true,
        index: middle
      };
    }
  }

  var PRIORITY_NAME = 'priority';

  var itemFactory = function itemFactory(priority, item) {
    var _ref;

    return _ref = {}, _defineProperty(_ref, PRIORITY_NAME, priority), _defineProperty(_ref, "item", item), _ref;
  }; // binarySearch using


  var valueHook = function valueHook(item) {
    return item && item[PRIORITY_NAME];
  };

  var QueuePriority =
  /*#__PURE__*/
  function () {
    function QueuePriority() {
      _classCallCheck(this, QueuePriority);

      this.queue = [];
    }

    _createClass(QueuePriority, [{
      key: "enqueue",
      value: function enqueue(priority, item) {
        var queueItem = itemFactory(priority, item); // empty

        if (this.isEmpty()) return this.queue.push(queueItem); // order enqueue

        var searchResult = binarySearch(this.queue, priority, 0, this.queue.length - 1, false, valueHook);
        if (searchResult.index === Infinity) this.queue.push(queueItem);else if (searchResult.index === -Infinity) this.queue.unshift(queueItem);else this.queue.splice(searchResult.index + 1, 0, queueItem);
      }
    }, {
      key: "dequeue",
      value: function dequeue() {
        var queueItem = this.queue.pop();
        return queueItem && queueItem.item;
      }
    }, {
      key: "isEmpty",
      value: function isEmpty() {
        return this.queue.length === 0;
      }
    }]);

    return QueuePriority;
  }();

  var EventMicro =
  /*#__PURE__*/
  function () {
    // params { Enum('normal', 'micro', 'macro') } mode
    function EventMicro() {
      var mode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'micro';

      _classCallCheck(this, EventMicro);

      this.listenerStore = {};
      this.tasksRegister = {};
      this.mode = mode;
    }

    _createClass(EventMicro, [{
      key: "dispatchEvent",
      value: function dispatchEvent(type) {
        var _this = this;

        // Dispatch is synchronous
        if (this.mode === 'normal') {
          this.immediatelyDispatchEvent(type);
          return;
        } // Dispatch is asynchronous


        if (!this.tasksRegister[type]) {
          if (this.mode === 'micro') {
            this.tasksRegister[type] = Promise.resolve().then(function () {
              _this.immediatelyDispatchEvent(type);

              _this.tasksRegister[type] = null;
            });
          } else if (this.mode === 'macro') {
            this.tasksRegister[type] = setTimeout(function () {
              _this.immediatelyDispatchEvent(type);

              _this.tasksRegister[type] = null;
            }, 0);
          }
        }
      }
    }, {
      key: "immediatelyDispatchEvent",
      value: function immediatelyDispatchEvent(type) {
        var listeners = this.listenerStore[type];

        if (Array.isArray(listeners)) {
          listeners.forEach(function (listener) {
            return listener();
          });
        }
      }
    }, {
      key: "addListener",
      value: function addListener(type, listener) {
        var listeners = this.listenerStore[type];
        if (Array.isArray(listeners)) listeners.push(listener);else this.listenerStore[type] = [listener];
      }
    }, {
      key: "removeEventListener",
      value: function removeEventListener(type, listener) {
        if (!this.listenerStore[type]) return;

        if (!listener) {
          this.listenerStore[type] = null;
        } else {
          this.listenerStore[type] = this.listenerStore[type].filter(function (item) {
            return item !== listener;
          });
        }
      }
    }]);

    return EventMicro;
  }();

  var Scheduler =
  /*#__PURE__*/
  function (_Event) {
    _inherits(Scheduler, _Event);

    function Scheduler() {
      var _this;

      var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck(this, Scheduler);

      var concurrentMax = config.concurrentMax,
          mode = config.mode;
      _this = _possibleConstructorReturn(this, _getPrototypeOf(Scheduler).call(this, mode));
      _this.queuePriority = new QueuePriority();
      _this.concurrentMax = concurrentMax || Scheduler.concurrentMax;

      _this.init();

      return _this;
    }

    _createClass(Scheduler, [{
      key: "init",
      value: function init() {
        var _this2 = this;

        _toConsumableArray(Array(this.concurrentMax).keys()).forEach(function (id) {
          var executant = function executant() {
            if (_this2.queuePriority.isEmpty()) return; // console.log(this.listenerStore);

            _this2.removeEventListener('schedule', executant);

            var task = _this2.queuePriority.dequeue();

            task.exec(function () {
              _this2.addListener('schedule', executant);

              if (!_this2.queuePriority.isEmpty()) _this2.dispatchEvent('schedule');
            });
          };

          executant.$_id = id;

          _this2.addListener('schedule', executant);
        });
      }
    }, {
      key: "schedule",
      value: function schedule(priority, task) {
        this.queuePriority.enqueue(priority, task);
        this.dispatchEvent('schedule');
      }
    }]);

    return Scheduler;
  }(EventMicro);

  Scheduler.concurrentMax = 4;

  var HttpTask =
  /*#__PURE__*/
  function () {
    function HttpTask(httpEngine, method, params) {
      var _this = this;

      _classCallCheck(this, HttpTask);

      this.isRepeal = false;
      this.httpEngine = httpEngine;
      this.method = method;
      this.params = params;
      this.promise = new Promise(function (resolve, reject) {
        _this.resolve = resolve;
        _this.reject = reject;
      });
    }

    _createClass(HttpTask, [{
      key: "exec",
      value: function () {
        var _exec = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee(next) {
          var _this$httpEngine, response;

          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (!this.isRepeal) {
                    _context.next = 3;
                    break;
                  }

                  next(false);
                  return _context.abrupt("return");

                case 3:
                  _context.prev = 3;
                  _context.next = 6;
                  return (_this$httpEngine = this.httpEngine)[this.method].apply(_this$httpEngine, _toConsumableArray(this.params));

                case 6:
                  response = _context.sent;
                  next(!this.isRepeal);
                  if (!this.isRepeal) this.resolve(response);
                  _context.next = 15;
                  break;

                case 11:
                  _context.prev = 11;
                  _context.t0 = _context["catch"](3);
                  next(false);
                  if (!this.isRepeal) this.reject(_context.t0);

                case 15:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this, [[3, 11]]);
        }));

        function exec(_x) {
          return _exec.apply(this, arguments);
        }

        return exec;
      }()
    }, {
      key: "abort",
      value: function abort() {
        this.isRepeal = true;
      }
    }, {
      key: "getPromise",
      value: function getPromise() {
        return this.promise;
      }
    }]);

    return HttpTask;
  }();

  var HttpDispatcher =
  /*#__PURE__*/
  function () {
    function HttpDispatcher(config) {
      _classCallCheck(this, HttpDispatcher);

      var httpEngine = config.httpEngine,
          arg = _objectWithoutProperties(config, ["httpEngine"]);

      this.httpEngine = httpEngine;
      this.scheduler = new Scheduler(arg);
    }

    _createClass(HttpDispatcher, [{
      key: "dispatch",
      value: function dispatch(priority, method) {
        for (var _len = arguments.length, params = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
          params[_key - 2] = arguments[_key];
        }

        var httpTask = new HttpTask(this.httpEngine, method, params);
        this.scheduler.schedule(priority, httpTask); // return HttpDispatcher.wrap(httpTask);

        return HttpDispatcher.wrapPromise(httpTask);
      }
    }], [{
      key: "wrap",
      value: function wrap(task) {
        var p = task.getPromise();
        p.getPromise = task.getPromise.bind(task);
        p.abort = task.abort.bind(task);
        return p;
      }
    }, {
      key: "wrapPromise",
      value: function wrapPromise(task) {
        var p = task.getPromise();
        ['then', 'catch', 'finally'].forEach(function (method) {
          task[method] = p[method].bind(p);
        });
        return task;
      }
    }]);

    return HttpDispatcher;
  }();

  var autoCancel = function () {
    var preTask = {};
    return function (task, idGenerator) {
      var taskId;

      try {
        if (typeof idGenerator === 'function') taskId = idGenerator(task);else taskId = task.id || JSON.stringify(task.params);

        if (taskId) {
          if (preTask[taskId]) preTask[taskId].abort();
          preTask[taskId] = task;
        }
      } catch (e) {}

      return task;
    };
  }();

  var taskHelper = /*#__PURE__*/Object.freeze({
    autoCancel: autoCancel
  });

  exports.default = HttpDispatcher;
  exports.taskHelper = taskHelper;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
