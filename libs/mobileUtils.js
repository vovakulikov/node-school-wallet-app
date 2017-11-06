'use strict';

const mobileUtils = {
	/**
	 * Проверяет номер телефона
	 * @param {String} value номер телефона
	 * @returns {Boolean}
	 */
    validateMobileNumber(value) {
		return /^\+?\d[\d\(\)\ -]{4,14}\d$/.test(value);
	}
};

module.exports = mobileUtils;
