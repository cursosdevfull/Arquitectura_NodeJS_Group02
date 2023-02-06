const http = require('http');
const express = require('express');
const cookieParser = require('cookie-parser');
const sessions = require('express-session');

const app = express();

const user = {
  username: 'shidalgo',
  password: '123',
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  sessions({
    secret: 'aladflkjalsdfjlasjdflfaskdf',
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
    resave: true,
  }),
);

app.set('view engine', 'ejs');

app.use(cookieParser());

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/user', (req, res) => {
  const { username, password } = req.body;
  if (username === user.username && password === user.password) {
    console.log(req.session);
  }

  res.send('ok');
});

app.post('/edit', (req, res) => {
  const { username } = req.body;

  user.username = username;
  res.send('Username changed');
});

const server = http.createServer(app);

server.listen(4200, () => console.log('Server is runnnig on port 4200'));
