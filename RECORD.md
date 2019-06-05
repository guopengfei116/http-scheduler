# Babel 7 无坑入门指南

## polyfill

简介

- polyfill 提供了完整的 ES2015+ environment。<br />
- 在一个 ES5 的执行环境（比如IE8）中引入 polyfill，便可以使用 **Set、Map、Promise** 这些新的 **API**。<br />
- 但是 polyfill **不能解决** 使用新语法的问题，比如 **const let class** 。

安装

```shell
npm install @babel/polyfill --save
```

导入使用

```js
// 传统方式
<script src="node_modules/@babel/polyfill/dist/polyfill.min.js"></script>

// esm
import "@babel/polyfill";

// cjs
require("@babel/polyfill");
```

## plugin 和 preset 的概念

- 在 babel 中要解决新语法转换的问题，需要使用 babel 插件来完成，但是新语法有很多，一个 plugin 只能解决一个新语法转换的问题。
- preset 是一堆 plugin 的集合，作用是简化 plugin 的配置。 
- 备注：语法转换是指把 ES5 之外的其它语法转换为 ES5 语法，比如把 const let class 甚至 JSX 、TS 这类语法转换为 ES5 语法。

## preset-env

简介

- preset-dev 是转换所有标准 ES2015+ 新语法的插件集合，配置起来更简洁

安装

```shell
npm install @babel/preset-env --save-dev
```

配置使用

```javascript
// .babelrc.js
presets = [
  [
    "@babel/env",
    {
      "modules": false, // 不转换模块语法，将来交给专业的打包工具处理
      "targets": { // 语法编译后要支持的运行环境
        "browsers": "> 2%",
        "node": "8",
      },
    },
  ],
];

module.exports = { presets };
```

## polyfill + preset-env

- 两者一起使用就可以提供 **完整的 ES2015+ 语法和执行环境**。
- 缺点是，如果只使用了极少数 ES2015+ API，比如只使用了 Promise，而导入整个 polyfill 有点大材小用，**增加了代码体积**。
- 还有一个缺点，就是新语法编译后的代码执行时需要依赖一些 helper 函数，
默认情况下编译后的代码和这些 helper 函数打包在了一起，如果有多个文件，每个文件中都含有这些 helper，**不利于代码复用**。
- 备注：helper 是 **编译后代码的运行时依赖**，比如下面的转换示例。

未转换前

```javascript
class Person {}
```

转换后

```javascript
// 这就是一个 helper
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var Person = function Person() {
  _classCallCheck(this, Person);
};
```

## corejs

简介

corejs 是模块化版本的 polyfill，使用它主要有两个好处：

1. 按需导入想要使用的 ES2015+ environment 功能模块，**无需** 加载整个 polyfill。
2. polyfill 会增加全局变量，而 corejs 在模块系统下可避免这个问题。
<!-- 不过像 [].includes 这样对原生对象的扩展，两者没任何差别。 -->

可用版本

corejs 现在有两个版本在同时维护，他们区别如下：

- corejs2: 含有全部 `ES2015+` 标准的 API 类库。
- corejs3: 在 2 的基础上增加了下一版 `ESNext runtime`，以及新的 `WebAPI runtime`。

安装任意一个版本

```shell
npm install @babel/runtime-corejs2 --save
npm install @babel/runtime-corejs3 --save
```

实现 polyfill 按需导入

1. preset-env 插件在配置时，有一个 useBuiltIns 配置项，
2. 当配置为 usage 时，preset-env 除了会编译语法结构，还会按需导入 API。
3. 这样就不用在代码里引入整个 polyfill 文件了，有助于减少代码体积。

```javascript
// .babelrc.js
presets = [
  [
    "@babel/env",
    {
      "modules": false,
      "targets": {
        "browsers": "> 2%",
        "node": "8",
      },
      "useBuiltIns": "usage",
    },
  ],
];

module.exports = { presets };
```

## transform-runtime

简介

这是另一个 babel 插件，使用它主要有两个好处：

1. 把语法编译后嵌入的 **helper** 函数根据编译后的模块系统变成 **按需导入**，达到复用 helper 避免重复打包 helper 的目的。
2. 如果使用了**新增对象**，比如 Promise、Set、Map，也会变成 **按需导入**。

补充说明

你应该已经发现，第二条好处和上面 preset-env/useBuiltIns 解决的问题有重叠，两者区别如下：

1. useBuiltIns 除了 **解决新增对象** 的问题，还可以 **解决原生对象增强** 的问题，如 Object.assign。
2. useBuiltIns **解决了按需载入 polyfill** 的问题，但是 **没有彻底解决polyfill 全局变量污染** 的问题（未采用模块化开发就会污染全局变量）。
3. transform-runtime **解决了新增对象按需载入和全局变量污染** 的问题，但 **不解决原生对象增强** 的问题。

安装

对于列举的第一点好处，需要安装 @babel/runtime 依赖，如果在运行环境中的方案中 **采用了 polyfill 全局载入** 的方式，污染全局变量事实已经无法改变，采用这种方式 **只优化 helper** 就可以了。

如果上诉两点好处都需要，安装任意一个版本的 @babel/runtime-corejs 依赖，如果在运行环境中的方案中 **采用了 useBuiltIns 按需载入**，除了可以 **优化 helper**，可以 **再优化全局变量污染** 的问题。

```shell
# 必须安装
npm install @babel/plugin-transform-runtime --save-dev
# 使用了 polyfill，只需要优化下 helper
npm install @babel/runtime --save
# 使用了 useBuiltIns，既需要优化 helper 又需要解决全局变量污染的问题
npm install @babel/runtime-corejs2(或3) --save 
```

### 优化点一：helper 优化

配置文件

```javascript
// .babelrc.js
const presets = [...];

// 配置 transform-runtime 插件
const plugins = [
  [
    "@babel/plugin-transform-runtime",
    {
      "corejs": false,
      "helpers": true, // 关键配置项，启用 helper 按需导入功能
      "regenerator": true,
      "useESModules": true
    }
  ],
];

module.exports = { presets, plugins };
```

待编译源码

```javascript
export default class Person {}
```

当 **未使用 transform-runtime 优化 helper** 时的编译输出

```javascript
// 嵌入了 helper，如果有多个文件，那么可能相同的 helper 可能被重复嵌入
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var Person = function Person() {
  _classCallCheck(this, Person);
};

export default Person;
```

当 **使用 transform-runtime 优化 helper** 的编译输出

```javascript
// 引入公共 helper，达到优化效果
import _classCallCheck from '@babel/runtime/helpers/classCallCheck';

var Person = function Person() {
  _classCallCheck(this, Person);
};

export default Person;
```

### 优化点二：全局污染优化

配置文件

```javascript
// .babelrc.js
const presets = [
  [
    "@babel/env",
    {
      "modules": false,
      "targets": {
        "browsers": "> 1%",
        "node": "8",
      },
      corejs: 2,
      useBuiltIns: "usage",
    },
  ],
];

const plugins = [
  [
    "@babel/plugin-transform-runtime",
    {
      "corejs": 2, // 关键配置，使用corejs2，配置3就是使用corejs3
      "helpers": true,
      "regenerator": true,
      "useESModules": true
    }
  ],
];

module.exports = { presets, plugins };
```

待编译源码

```javascript
// Promise 是 ES2015+ 新增的全新对象
var p = new Promise();
console.log(p);

// includes 是 ES2015+ 对原生对象的增强
const i = [1,2,3].includes(3);
console.log(i);
```

使用 useBuiltIns，但未使用 transform-runtime 解决全局污染

```javascript
import 'core-js/modules/es7.array.includes';
import 'core-js/modules/es6.string.includes';
import 'core-js/modules/es6.promise';
import 'core-js/modules/es6.object.to-string';

var p = new Promise();
console.log(p);

var i = [1, 2, 3].includes(3);
console.log(i);
```

使用 useBuiltIns，并使用 transform-runtime 解决全局污染

```javascript
import 'core-js/modules/es7.array.includes';
import 'core-js/modules/es6.string.includes';
import _Promise from '@babel/runtime-corejs2/core-js/promise';

// 新增对象的全局污染问题解决了
var p = new _Promise();
console.log(p);

// 原生对象增强没啥变化
var i = [1, 2, 3].includes(3);
console.log(i);
```

### 顺手解决的 helper 兼容问题 

> - 前面使用 transform-runtime 插件优化复用了编译后代码运行所需的 helper，
> - 实际上这些 helper 内部使用了很多 ES6+ API，比如 Promise、Map、Symbol 等等，
> - 在兼容不佳的情况下，我们需要引入 @babel/polyfill 添加这些全局 API 进行解决，
> - 但是如果使用了 useBuiltIns 我们就不希望再引入整个 polyfill，
> - 不过不用担心，上面我们解决全局污染的时候，transform-runtime 配置了 corejs，
> - 配置后它还会影响 helper 的导入路径，从原来的 ES6 版本变成了 corejs 中的兼容 ES5 版本。

未配置 corejs

```javascript
// 从 @babel/runtime 包中导入
import _classCallCheck from '@babel/runtime/helpers/esm/classCallCheck';

var Person = function Person() {
  _classCallCheck(this, Person);
};

export default Person;
```

配置了 corejs

```javascript
// 变成从 @babel/runtime-corejs2 包中导入
import _classCallCheck from '@babel/runtime-corejs2/helpers/esm/classCallCheck';

var Person = function Person() {
  _classCallCheck(this, Person);
};

export default Person;
```

### 最后一个完美主义者要解决的问题

- 一路下来，你可能会按照下面的方式进行配置，然后在此基础上添加其它语法转换插件，
- 这确实没啥问题，不过如果你的代码要进行打包，并且用了一个不够智能的打包系统或策略，
- 如果你使用了 async 或 generator 函数，那么可能会存在重复打包 regenerator-runtime 的风险，
- regenerator-runtime 是 async 函数和 generator 函数编译后代码运行时所需的依赖，
- 造成它的原因是 useBuiltIns 和 transform-runtime 都会处理 regenerator-runtime 依赖，
- 解决办法是修改 transform-runtime 插件的 regenerator 配置，默认为 true，我们改为 false。

```javascript
// .babelrc.js
const presets = [
  [
    "@babel/env",
    {
      "modules": false,
      "targets": {
        "browsers": "> 1%",
        "node": "8",
      },
      corejs: 2,
      useBuiltIns: "usage",
    },
  ],
];

const plugins = [
  [
    "@babel/plugin-transform-runtime",
    {
      "corejs": 2,
      "helpers": true,
      "regenerator": false, // 关键配置
      "useESModules": true
    }
  ],
];

module.exports = { presets, plugins };
```

待编译源码

```javascript
function *fn() {
  return yield 123;
}
fn();
```

启用 useBuiltIns 和 regenerator 

```javascript
import _regeneratorRuntime from '@babel/runtime-corejs2/regenerator';
import 'regenerator-runtime/runtime';

var _marked =
/*#__PURE__*/
_regeneratorRuntime.mark(fn);

function fn() {
  return _regeneratorRuntime.wrap(function fn$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return 123;

        case 2:
          return _context.abrupt("return", _context.sent);

        case 3:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}

fn();
```

启用 useBuiltIns，关闭 regenerator 

```javascript
import 'regenerator-runtime/runtime';

var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(fn);

function fn() {
  return regeneratorRuntime.wrap(function fn$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return 123;

        case 2:
          return _context.abrupt("return", _context.sent);

        case 3:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}

fn();
```

## 配合打包工具使用

### 打包输出成模块系统

流行的模块系统有：amd、cjs、system、esm。<br />
还有 umd 模式，这种模式包含 amd、cjs 和 iife，iife 属于非模块系统，下面单独说明。

> - 正常情况下编译后的文件会根据编译需求嵌入各种 `helper` 和 `runtime` 函数，
> - 每个编译文件都被嵌入这些 `helper` 和 `runtime` 不利用代码复用，
> - 如果要编译成某种模块系统，最好使用 `transform-runtime` 插件把这些函数改为模块导入的形式，
> - 使用这个特性需要安装如下两个包，注意第一个包是开发时依赖，第二个包是运行时依赖。

### 打包输出成非模块系统

流行的编译模式为：iife。 <br />
IIFE: Immediately Invoked Function Expression，意为立即调用的函数表达式。

> - 这种模式编译后的代码主要是为了在浏览器环境中运行，并且不依赖任何模块系统，简单直接。
> - 如果编译成这种非模块代码，建议不要使用 `transform-runtime` 插件，因为在没有模块系统的情况下，
> - 使用 `transform-runtime` 插件编译的代码需要先手动导入依赖的 `helper` 和 `runtime`，
> - 而不使用 `transform-runtime` 插件编译的代码自动嵌入依赖的 `helper` 和 `runtime`。

待编译源码

```javascript
export default class Person {}
```

未使用 transform-runtime 的编译输出

```javascript
var Person = (function () {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Person = function Person() {
    _classCallCheck(this, Person);
  };

  return Person;

}());
```

使用 transform-runtime 的编译输出

```javascript
var Person = (function (_classCallCheck) {
	'use strict';

	_classCallCheck = _classCallCheck && _classCallCheck.hasOwnProperty('default') ? _classCallCheck['default'] : _classCallCheck;

	var Person = function Person() {
	  _classCallCheck(this, Person);
	};

	return Person;

}(_classCallCheck));
```

### 打包建议

1. 如果打包为模块，建议使用 `transform-runtime` 插件，自动按需引入 `helper`
2. 如果打包为普通代码，建议不要使用该插件，在编译输出时把 `helper` 打包在一起，<br />
但是如果使用了 `async` 或 `generator` 函数，需要手动引入 `regenerator-runtime` 包。

### transform-runtime 总结

使用插件

1. 去除所有的 `helper` 函数，减少代码体积。
2. 如果编译为模块，会自动加上依赖的 `helper` 和 `runtime` 模块导入语法
3. 如果编译为普通代码，在使用前需要手动导入依赖的 `helper` 和 `runtime`

不使用插件

1. 编译后的代码会包含运行所需的各种 `helper` 函数，但是不包含 `regeneratorRuntime`<br />
`regeneratorRuntime` 是 `async` 函数和 `generator` 函数编译后的代码运行时的一个依赖。
2. 如果编译为模块，在使用前根据需要手动导入 `regenerator-runtime` 包。
3. 如果编译为普通代码，同样在使用前根据需要手动导入 `regenerator-runtime` 包。

补充：`@babel/polyfill` 和 `corejs` 已经包含了 `regenerator-runtime` 的内容，<br />
如果导入了 `polyfill`，或者开启了 `useBuiltIns` 功能，就无需再导入 `regenerator-runtime` 了。







> - 第一个包是 babel 插件，需要修改 babel 的配置文件进行使用。
> - 这个包的作用是。
> - 第二个包包含了所有的 `helper` 和 `runtime`，编译后的文件依赖这里面的 `helper`。
> - 比如下面的案例，充分解释了 `transform-runtime` 插件的作用。
