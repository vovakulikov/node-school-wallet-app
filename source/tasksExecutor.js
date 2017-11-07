const crontab = require('node-crontab');
const asnc = require('async');
const logger = require('libs/logger')('task-executor');
const TaskModel = require('./models/tasks');
const CardModel = require('./models/cards');
const TransactionsModel = require('./models/transactions');
const bot = require('./telegram-bot/bot/connection');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/school-wallet', {useMongoClient: true});
mongoose.Promise = global.Promise;

const mTasks = new TaskModel();
const mCards = new CardModel();
const mTrans = new TransactionsModel();

crontab.scheduleJob('*/1 * * * *', () => {
	// This will call this function every 1 minute
	console.log("It's been 1 minute!");

	logger.info('Tasks executor started.');

	mTasks.executionList()
		.then(taskListHandler)
		.catch(closeConnection);
});

function taskListHandler(list) {
	// если нечего выполнять, завершаем работу
	if (!list || !list.length) {
		return closeConnection();
	}

	// идем по списку задач и выполняем их
	asnc.each(list, (task, callback) => {
		executeTask(task)
			.then(_ => callback()) // задача выполнилась
			.catch(err => callback(err)); // задача не смогла выполниться
	// в конце закрываем соединение
	}, closeConnection);
}

function closeConnection(err) {
	// mongoose.connection.close();
	if (err) {
		logger.error('Tasks executor done with error', err);
		return;
	}
	logger.info('Tasks executor done.');
}

async function executeTask({id, from, amount, target, label}) {
	let card = await mCards.get(from);
	let data = null;

	if (!card) {
		// если нет карты
		throw new Error(`Card id=${from} not found`);
	}

	if (amount > card.balance) {
		// недостаточно средств
		// что делать когда недостаточно средств, считать невыполненной?
		logger.warn(`Balance is not enough for task on cards id = ${from}`);
		return;
	}

	switch (target.type) {
		case 'card2Card':
			data = await card2CardPay(parseInt(target.number, 10), amount, card, id);
			break;
		case 'paymentMobile':
			data = {phoneNumber: target.number};
			// Отправляем нотификации пользователем
			bot.notify({
				action: 'card-to-mobile',
				card: card,
				phoneNumber: target.number,
				commission: 3,
				sum: amount,
				date: new Date().toISOString()
			});
			break;
		default:
			throw new Error(`Unexpected payment type in task id=${id}`);
	}

	// списываем с карты сумму
	card = await mCards.withdraw(from, amount);

	// создаем транзакцию
	return mTrans.create({
		cardId: from,
		type: target.type,
		sum: '-' + amount,
		data,
	}).then( _ => {
		// помечаем задачу выполненной
		return mTasks.done(id).catch(err=>logger.error('Error while marking task done ',err));
	});
}

async function card2CardPay (cardId, amount, sourceCard, id) {
	const targetCard = await mCards.get(cardId);
	if (!targetCard) {
		// нет карты, принимающей средства
		throw new Error(`Target card id=${cardId} not found for task id=${id}`);
	}
	// начисляем и создаем транзакцию
	await mCards.refill(cardId, amount);
	await mTrans.create({
		cardId,
		type: 'card2Card',
		data: {cardNumber: sourceCard.cardNumber},
		sum: amount.toString(10)
	});

	// Отправляем нотификации через бота
	bot.notify({
		action: 'card-to-card',
		sourceCard,
		targetCard,
		sum: amount,
		date: new Date().toISOString()
	});

	return {
		cardNumber: targetCard.cardNumber
	};
}
