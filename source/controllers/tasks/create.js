'use strict';

const ApplicationError = require('libs/application-error');
const _ = require('lodash');

const allowedTypes = ['paymentMobile', 'card2Card'];
const fields = ['from', 'label', 'target', 'amount', 'period', 'createDate', 'executionTime'];

module.exports = async (ctx) => {
	const task = _.pick(ctx.request.body, fields);
	const cardId = Number(ctx.params.id);

    const card = await ctx.cardsModel.get(cardId);
    if (!card) {
        throw new ApplicationError(`No card with id ${cardId}`, 404);
    }

    task.from = cardId;

    if (!allowedTypes.includes(task.target.type)) {
        throw new ApplicationError(`forbidden task target type: ${task.target.type}`, 403);
    }

    const newTask = await ctx.tasksModel.create(task);
    ctx.status = 201;
    ctx.body = newTask;
};
