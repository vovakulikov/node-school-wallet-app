var crontab = require('node-crontab');
var jobId = crontab.scheduleJob("*/1 * * * *", function(){

	//This will call this function every 1 minute
	//console.log("It's been 1 minute!");

	const asnc = require('async');
	const logger = require('libs/logger')('task-executor');
	const TaskModel = require('./models/tasks');
	const CardModel = require('./models/cards');
	const TransactionsModel = require('./models/transactions');

	const mongoose = require('mongoose');
	mongoose.connect('mongodb://localhost/school-wallet', { useMongoClient: true });
	mongoose.Promise = global.Promise;

	const mTasks = new TaskModel();
	const mCards = new CardModel();
	const mTrans = new TransactionsModel();

	logger.info('tasks executor started');

	mTasks.executionList()
		.then(taskListHandler)
		.catch(closeConnection);


	function taskListHandler (list) {
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

	function closeConnection (err) {
		mongoose.connection.close();
		if (err) {
			logger.error('Task executor done with error', err);
			return;
		}
		logger.info('Task executor done.');
	}

	async function executeTask({id, from, amount, target}) {
		let data = target.number, resultTransaction, targetCard, card = await mCards.get(from);

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

		// если задача = перевод на карту, пополняем её
		if (target.type === 'card2Card') {
			const num = parseInt(target.number, 10);
			targetCard = await mCards.get(num);
			if (!targetCard) {
				// нет карты, принимающей средства
				return;
			}

			data = targetCard.cardNumber;
			// начисляем и создаем транзакцию
			await mCards.refill(num, amount);
			await mTrans.create({
				cardId: num,
				type: target.type,
				data: card.cardNumber,
				sum: amount.toString(10)
			});
		}

		// списываем с карты сумму
		card = await mCards.withdraw(from, amount);

		// создаем транзакцию
		return mTrans.create({
			cardId: from,
			type: target.type,
			data: data,
			sum: '-' + amount
		}).then( _ => {
			// помечаем задачу выполненной
			return mTasks.done(id).catch(err=>logger.error('Error while marking task done ',err));
		});
	}

});