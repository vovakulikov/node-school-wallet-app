'use strict';

const commission = 3;

module.exports = async (ctx) => {
	const cardId = ctx.params.id;
   
	const operation = ctx.request.body;
	const {sum, phoneNumber} = operation;

	ctx.cardsModel.withdraw(cardId, parseInt(sum, 10) + commission);

	const transaction = await ctx.transactionsModel.create({
		cardId,
		type: 'withdrawCard',
		data: {phoneNumber},
		time: new Date().toISOString(),
		sum
    });

    const card = await ctx.cardsModel.get(cardId)
    ctx.bot.notify({ 
        action: 'card-to-mobile', 
        card, 
        phoneNumber, 
        commission,
        sum, 
        date: new Date().toISOString()
    });

	ctx.status = 200;
	ctx.body = transaction;
};
