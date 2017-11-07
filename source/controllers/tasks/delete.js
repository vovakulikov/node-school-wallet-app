'use strict';

module.exports = async (ctx) => {
	const taskId = Number(ctx.params.id);
	await ctx.tasksModel.remove(taskId);
	ctx.status = 200;
};
