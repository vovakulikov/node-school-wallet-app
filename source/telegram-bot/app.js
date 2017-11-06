const express = require('express');

const app = express();
const bot = require('./bot-server.js');
const bodyParser = require('body-parser');

app.use(bot.webhookCallback('/secret-path'));
bot.telegram.setWebhook('https://8f9e2bc2.ngrok.io/secret-path');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(async (req, res, next) => {
  await bot.context.botModel.loadFile();
  req.bot = bot.context.botModel;

  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/notify', (req, res) => {
  req.bot.notifyAllUsers(req.body.message);
  res.end('ok');
});

app.listen(3001, () => {
  console.log('Example app listening on port 3001!');
});
