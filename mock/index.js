const path = require('path');

module.exports = {
  needMock: true,
  prefix: "api",
  tip: true,
  storePath: path.resolve(__dirname, "store"),
  routes: {
    "GET:movie": ({store, query}) => {
      return store.movies.slice(0, query.count || 5);
    },
    "GET:movie/:id": ({store, params}) => {
      return store.movies.filter(movie => movie.id === params.id);
    },
  },
};
