export default function(httpDispatcher) {
  return function(priority) {
    const axiosPrams = [
      'http://api.douban.com/v2/movie/in_theaters',
      {
        params: { count: Math.abs(priority) },
      },
    ];
    const promise = httpDispatcher.dispatch(priority, 'get', ...axiosPrams);
    promise.then((res) => {
      let movies = [];
      if (res.data && res.data.subjects) {
        movies = res.data.subjects.map((subject) => subject.title);
      }
      console.log(`拿到豆瓣电影热映TOP5: ${JSON.stringify(movies)}`);
    }).catch((e) => {
      console.log('请求失败');
    });
    return promise;
  };  
};
