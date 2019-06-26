export default function(httpDispatcher) {
  return function(priority) {
    const axiosPrams = [
      'http://localhost:5566/api/movie',
      {
        params: { count: Math.abs(priority) },
      },
    ];
    const httpTask = httpDispatcher.dispatch(priority, 'get', ...axiosPrams);

    httpTask.then((res) => {
      let movies = [];
      if (res.data) movies = res.data.map((movie) => movie.title);
      console.log(`拿到豆瓣电影热映TOP5: ${JSON.stringify(movies)}`);
    }).catch((e) => {
      console.log(`请求失败: ${e.message}`);
    });

    return httpTask;
  };
};
