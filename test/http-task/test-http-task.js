import axios from 'axios';
import HttpTask from '../../src/http-task';

const axiosPrams = [
  'http://api.douban.com/v2/movie/in_theaters',
  {
    params: { count: 5 },
  },
];
const httpTask = new HttpTask(axios, 'get', axiosPrams);

// exec before
httpTask.getPromise().then((res) => {
  let movies = [];
  if (res.data && res.data.subjects) {
    movies = res.data.subjects.map((subject) => subject.title);
  }
  console.log(`拿到豆瓣电影热映TOP5: ${JSON.stringify(movies)}`);
});

httpTask.exec().then(() => {
  console.log(`请求发送成功！`);
});

// exec after
httpTask.getPromise().then((res) => {
  let movies = [];
  if (res.data && res.data.subjects) {
    movies = res.data.subjects.map((subject) => subject.title);
  }
  console.log(`拿到豆瓣电影热映TOP5: ${JSON.stringify(movies)}`);
});
