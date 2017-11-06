const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// const TelegramUsersModel = require('../models/telegram-users');
const bot = require('./bot/bot-server.js');
const botConfig = require('./config');

// Set webhooks telegram
app.use(bot.webhookCallback('/secret-path'));
bot.telegram.setWebhook(`${botConfig.botHost}/secret-path`);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Use this for chain wallet-app and bot server
app.post('/notify', async (req, res) => {
	const users = await bot.context.telegramUsersModel.getAll();
	console.log(req.body.message)
	users.forEach(user => {
		bot.telegram.sendMessage(user.id, req.body.message, { parse_mode: 'markdown' });
	});

  	res.end('ok');
});

app.listen(3001, () => console.log('Example app listening on port 3001!'));
