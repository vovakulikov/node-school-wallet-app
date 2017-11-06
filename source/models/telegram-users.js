'use strict';

const ApplicationError = require('libs/application-error');

const DbModel = require('./common/dbModel');

class TelegramUsers extends DbModel {
	constructor() {
		super('telegram-users');
	}

	/**
	 * Добавляет телеграм пользователя
	 *
	 * @param {Object} user описание пользователя
	 * @returns {Promise.<Object>}
	 */
	async create(user) {
		const hasUser = await this.get(user.id);

		if (!hasUser) {
			await this._insert(user);
		}

		return user;
	}
}

module.exports = TelegramUsers;
