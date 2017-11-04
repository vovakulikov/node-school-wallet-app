'use strict';

const ApplicationError = require('libs/application-error');

const DbModel = require('./common/dbModel');

class Tasks extends DbModel {
	constructor() {
		super('task');
	}

	/**
	 * Добавляет  задачу
	 *
	 * @param {Object} card описание задачи
	 * @returns {Promise.<Object>}
	 */
	async create(task) {
		if (task) {
			const newTask = Object.assign({}, task, {
				id: await this._generateId(),
				
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
		const today = new Date();
		const list = await this.getListBy({
			$and: [{ //  отобрать задачи 
				$and: { // время выполнения которых уже наступило
					'executionTime.hour': {
						$lte: today.getHours()
					},
					'executionTime.minute': {
						$lte: today.getMinutes()
					}
				}
			}, {
				$or: [{
					period: { // число месяца = текущему числу
						$eq: {
							type: 'month',
							value: today.getDate() + ''
						}
					}
				}, {
					period: { // или день недели = текущему дню недели
						$eq: {
							type: 'week',
							value: today.getDay() + ''
						}
					}
				}]
			}, {
				$ne: { // и сегодня еще не выполнялись
					lastExecution: { $eq: dateString(today)}
				}
			}]
		});
		return list;
	}
}

module.exports = Tasks;

function dateString(date) {
	date = date || new Date();
	const 
		y = date.getFullYear(),
		m = date.getMonth() + 1,
		d = date.getDate();
	return `${y}-${m}-${d}`;
}
