import axios from 'axios';
import HttpTask from '../../src/http-task';

const axiosPrams = [
  'http://localhost:5566/api/movie',
  {
    params: { count: 3 },
  },
];
const httpTask = new HttpTask(axios, 'get', axiosPrams);

// exec before
httpTask.getPromise().then((res) => {
  let movies = [];
  if (res.data) movies = res.data.map((movie) => movie.title);
  console.log(`拿到豆瓣电影热映TOP5: ${JSON.stringify(movies)}`);
}).catch((e) => {
  console.error(e.msg);
});

httpTask.exec((isExec) => {
  if (isExec) console.log('%c%s', 'color: green', '成功发送Http请求');
  else console.log('%c%s', 'color: red', '请求失败');
});

httpTask.abort();
console.log('%c%s', 'color: yellow', '尝试中断Http请求');

// exec after
httpTask.getPromise().then((res) => {
  let movies = [];
  if (res.data) movies = res.data.map((movie) => movie.title);
  console.log(`拿到豆瓣电影热映TOP5: ${JSON.stringify(movies)}`);
}).catch((e) => {
  console.error(e.msg);
});
