const mongoose = require('mongoose');
const TelegramUser = mongoose.model('TelegramUser', {
	id: {
		type: Number,
		required: true
	},
	is_bot: {
		type: Boolean,
		required: true
	},
	first_name: {
		type: String,
		required: true
	},
	last_name: {
		type: String,
		required: true
	},
	username: {
		type: String,
		required: true
	},
	language_code: {
		type: String,
		required: true
	}
});


module.exports = TelegramUser;
