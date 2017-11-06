'use strict';

module.exports = async (ctx) => {
	const mobileID = Number(ctx.params.id);
	await ctx.mobileModel.remove(mobileID);
	ctx.status = 200;
};
