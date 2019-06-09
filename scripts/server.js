const path = require('path');
const express = require('express');
const mock = require('dynamic-mock-express');

const app = express();

app.use(express.static(path.resolve(__dirname, '../')));
app.use(express.static(path.resolve(__dirname, '../example')));

app.get('/api/search', (req, res) => {
  setTimeout(() => {
    res.send({ delay: String(req.query.delay).repeat(30) });
  }, 1000 * (req.query.delay || 1));
});

app.use(
  mock({
    mockDir: path.resolve(__dirname, "../mock"),
  }),
);

app.listen(5566, () => console.log('start dev server by port 5566'));
