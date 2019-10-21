import axios from 'axios';

const url = 'http://localhost:5566/api/movie';
const getMovieAPI = (priority) => () => {
  const params = { count: Math.abs(priority) };
  return axios.get(url, params);
};

export default function(dispatcher) {
  return function(priority) {
    const getMovie = getMovieAPI(priority);
    const task = dispatcher.dispatch(getMovie, priority);

    task.then((res) => {
      let movies = [];
      if (res.data) movies = res.data.map((movie) => movie.title);
      console.log(`拿到豆瓣电影热映TOP5: ${JSON.stringify(movies)}`);
    }).catch((e) => {
      console.log(`请求失败: ${e.message}`);
    });

    return task;
  };
};
