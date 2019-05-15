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

httpTask.exec().then(() => {
  console.log(`请求已发出！`);
});

httpTask.abort();

// exec after
httpTask.getPromise().then((res) => {
  let movies = [];
  if (res.data) movies = res.data.map((movie) => movie.title);
  console.log(`拿到豆瓣电影热映TOP5: ${JSON.stringify(movies)}`);
}).catch((e) => {
  console.error(e.msg);
});
