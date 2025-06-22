import express from 'express';

const app = express();

app.use('/users', (req, res) => {
  console.log('请求到达 /users 路由');
  res.send('用户列表');
});

const port = 3000;
app.listen(port, () => {
  console.log(`服务器启动，监听端口 ${port}`);
});