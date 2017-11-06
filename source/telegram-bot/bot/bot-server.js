const Telegraf = require('telegraf');
const axios = require('axios');
const Markup = require('telegraf/markup');
const config = require('config');
const mongoose = require('mongoose');
const { makeCardsList } = require('../utils/message-template');

mongoose.connect(config.get('mongo.uri'), { useMongoClient: true });
mongoose.Promise = global.Promise;

const botConfig = require('../config/index');
const TelegramUsersModel = require('../../models/telegram-users');

// const TelegramUsersModel = require('../models/telegram-users');
const bot = new Telegraf(botConfig.token);

// Write to context our bot model with users
bot.context.telegramUsersModel = new TelegramUsersModel();

bot.start(async (ctx) => {
  // add user in DB
  await ctx.telegramUsersModel.create(ctx.from);
  const users = await ctx.telegramUsersModel.getAll();

  ctx.reply('Welcome to your personal wallet bot', Markup
	  .keyboard(['Получить выписку по картам'])
	  .oneTime()
	  .resize()
	  .extra());
});

bot.hears('Получить выписку по картам', (ctx) => {
  axios.get(`${botConfig.appHost}/cards`)
    .then((cards) => ctx.replyWithMarkdown(makeCardsList(cards.data)));
});

bot.on('text', async (ctx) => ctx.reply('Hey there!'));

bot.catch((err) => console.log('Ooops', err));

module.exports = bot;
