
const FileModel = require('../../models/common/fileModel');

module.exports = class BotModel extends FileModel {
  constructor(telegram) {
    super('users.json');

    this.telegram = telegram;
  }

  async addUser(ctx) {
    const currentUser = this._dataSource.find((user) => ctx.from.id === user.id);
    if (!currentUser) {
      this._dataSource.push(ctx.from);
      await this._saveUpdates();
    }
  }

  notifyAllUsers(message) {
    this._dataSource.forEach((user) => {
      this.telegram.sendMessage(user.id, message, { parse_mode: 'markdown'});
    });
  }
};
