const Telegraf = require('telegraf');
const axios = require('axios');
const Markup = require('telegraf/markup');
const config = require('./config');

const bot = new Telegraf('345355083:AAF_TlVNTZbMqS_89AQN30Y_63aaicC5xBQ');
const BotModel = require('./models/botModel');

// Write to context our bot model with users
bot.context.botModel = new BotModel(bot.telegram);


bot.use(async (ctx, next) => {
  await ctx.botModel.loadFile();
  await next();
});

bot.start(async (ctx) => {
  await ctx.botModel.addUser(ctx);
  ctx.reply('Welcome to your personal wallet bot', Markup
	  .keyboard(['Получить выписку по картам'])
	  .oneTime()
	  .resize()
	  .extra());
});

bot.hears('Получить выписку по картам', (ctx) => {
  axios.get(`${config.appHost}/cards`)
    .then((cards) => ctx.replyWithMarkdown(makeDataList(cards.data)));
});

bot.on('text', (ctx) => {
  ctx.reply('Hey there!');
});
function makeDataList(cards) {
  const getTemplate = (card) => `${card.cardNumber} ${card.balance} руб`;

  return cards.reduce((memo, card) => {
    memo += `\n${getTemplate(card)}`;
    return memo;
  }, '*Список карт*');
}

module.exports = bot;
