'use strict';

const ApplicationError = require('libs/application-error');

const DbModel = require('./common/dbModel');

class Tasks extends DbModel {
	constructor() {
		super('task');
	}

	/**
	 * Добавляет задачу
	 *
	 * @param {Object} task описание задачи
	 * @returns {Promise.<Object>}
	 */
	async create(task) {
		if (task) {
			const newTask = Object.assign({}, task, {
				id: await this._generateId()
			});

			await this._insert(newTask);
			return newTask;
		}

		throw new ApplicationError('Empty params to create task', 503);
	}

	/**
	 * Удалет задачу
	 * @param {Number} id идентификатор задачи
	 */
	async remove(id) {
		const task = await this.get(id);
		if (!task) {
			throw new ApplicationError(`Task with ID=${id} not found`, 404);
		}
		await this._remove(id);
	}

	/**
	 *  Отмечает задачу выполненной
	 * @param {Number} id идентификатор задачи
	 */
	async done(id) {
		await this._update({id}, {lastExecution: dateString()});
	}

	/**
	 *  Список невыполненных задач на сегодня, которые нужно сделать прямо сейчас
	 */
	async executionList() {
		const filter = makeFilter();
		const list = await this.getListBy(filter);
		return list;
	}
}

module.exports = Tasks;

function dateString(date) {
	date = date || new Date();
	const y = date.getFullYear();
	const m = date.getMonth() + 1;
	const d = date.getDate();
	return `${y}-${m}-${d}`;
}

function makeFilter() {
	const now = new Date();
	return {
		$and: [{ // отобрать задачи
			$or: [{ // час выполнения которых меньше чем текущий
				'executionTime.hour': {
					$lt: now.getHours()
				}
			}, {
				$and: [{ // или час такой же
					'executionTime.hour': {
						$eq: now.getHours()
					}
				}, { // но минут меньше
					'executionTime.minute': {
						$lte: now.getMinutes()
					}
				}]
			}]
		}, {
			$or: [{
				period: { // число месяца = текущему числу
					$eq: {
						type: 'month',
						value: now.getDate().toString(10)
					}
				}
			}, {
				period: { // или день недели = текущему дню недели
					$eq: {
						type: 'week',
						value: now.getDay().toString(10)
					}
				}
			}]
		}, {
			lastExecution: { // и сегодня еще не выполнялись
				$ne: dateString(now)
			}
		}]
	};
}
