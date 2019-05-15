const path = require('path');
const express = require('express');
const mock = require('dynamic-mock-express');

const app = express();

app.use(
  mock({
    mockDir: path.resolve(__dirname, "../mock"),
  }),
);

app.listen(5566, () => console.log('start dev server'));
