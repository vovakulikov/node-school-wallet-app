
module.exports.makeCardsList =  function(cards) {
	const getTypeOfCard = (number) => {
		const typeBook = {
			'4': 'VISA',
			'5': 'MasterCard',
			'3': 'American Express',
			'6': 'Discover'
		};

		return typeBook[number[0]];
	};
	const getTemplate = (card) => `*${getTypeOfCard(card.cardNumber)}* \n${card.cardNumber} _${card.balance} руб_`;

	return cards.reduce((memo, card, index) => {
		memo += `\n${index+1}. ${getTemplate(card)}`;
		return memo;
	}, '*Список карт \n*');
};

module.exports.getCardToCardMessage = function({
	sourceCard, targetCard, sum, date
}) {
	return `*Перевод с карты на карту \n \n*` +
			`*C карты ${sourceCard.cardNumber}* ` +
			`на карту ${targetCard.cardNumber} было переведено ${sum} рублей. ` +
			`Время операции ${new Date(date).toLocaleString()}. ` +
			`\nТекущий счет карты ${targetCard.balance} рублей`;
};

module.exports.getCardToMobileMessage = function({
	card, phoneNumber, commission, sum, date
}) {
	return "*Оплата мобильного телефона* \n \n" +
			`*С карты ${card.cardNumber}*` +
			`была произведена оплата` +
			`мобильного телефона*${phoneNumber} `+
			`на сумму ${sum} рублей*. ` +
			`\nКомиссия при оплате составила ${commission} рубля. ` +
			`\nВремя операции по Москве - ${new Date(date).toLocaleString()}. ` +
			`\nТекущий счет карты ${card.balance} рублей`;
};

