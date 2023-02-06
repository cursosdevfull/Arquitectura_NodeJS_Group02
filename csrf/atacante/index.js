const http = require('http');
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

const server = http.createServer(app);

server.listen(5100, () => console.log('Server is runnnig on port 5100'));
