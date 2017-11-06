'use strict';

module.exports = async (ctx) => {
	const mobile = ctx.request.body;
	const newMobile = await ctx.mobileModel.create(mobile);
	ctx.status = 201;
	ctx.body = newMobile;
};
