'use strict';

module.exports = async (ctx) => {
	const cardId = Number(ctx.params.id);
	ctx.body = await ctx.tasksModel.getByCard(cardId);
};
