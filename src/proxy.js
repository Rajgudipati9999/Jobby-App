const express = require('express');
const request = require('request');
const cors = require('cors');
const app = express();

app.use(cors());

app.use('/login', (req, res) => {
  const url = 'https://apis.ccbp.in' + req.url;
  req.pipe(request({ qs:req.query, uri: url })).pipe(res);
});

app.listen(3004, () => {
  console.log('Proxy server is running on port 3004');
});
