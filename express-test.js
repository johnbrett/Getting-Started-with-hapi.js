const express = require('express');

const app = express();

app.get('/hello', (req, res, next) => {
	console.log('a')
  res.send('Hello World!');
});
app.get('/hello', (req, res, next) => {
	console.log('b')
  res.send('next action');
});

const server = app.listen(3000, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});