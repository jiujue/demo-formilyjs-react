// server.js
const jsonServer = require('json-server');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router(path.resolve(__dirname, './db.json'));

const middlewares = jsonServer.defaults();
const expressJwt = require('express-jwt');

server.use(expressJwt({
  secret: 'secret12345', // 签名的密钥 或 PublicKey
  algorithms: ['HS256'],
}).unless({
  path: ['/login', '/favicon.ico', '/script.js', '/style.css', '/__rules', '/db', '/'], // 指定路径不经过 Token 解析
}));

const Login = (req, res) => {
  if (req.method === 'POST' && req.path === '/login') {
    if (req.body.username === 'jiujue' && req.body.password === '123456') {
      const token = `Bearer ${jwt.sign(
        {
          _id: req.body.username,
          admin: req.body.password,
        },
        'secret12345',
        {
          expiresIn: 3600 * 24 * 3,
        },
      )}`;
      return res.json({
        code: 200,
        data: { token },
      });
    }
    return res.status(400).json({
      code: 400,
      msg: '用户名或密码错误',
    });
  }
};

server.use(middlewares);
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

server.use((req, res, next) => {
  if (req.path === '/login') {
    Login(req, res);
  } else { // add your authorization logic here
    next();
  }
});

router.render = (req, res) => {
  res.jsonp({
    msg: '200',
    data: res.locals.data,
  });
};

server.use(router);

server.listen(8998, () => {
  console.log('mock server is running :', 'http://localhost:8998');
});
