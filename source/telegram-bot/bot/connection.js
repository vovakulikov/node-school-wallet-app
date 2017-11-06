const axios = require('axios');
const { botHost } = require('../config/index');
const { getCardToCardMessage,
		getCardToMobileMessage } = require('../utils/message-template');

class BotConnection {
  constructor(botServerHost) {
    this.host = botServerHost;
  }

  notifyBotServer(message) {
    axios.post(`${this.host}/notify`, {message});
  }

  notify(messageData) {
    const message = this.getCurrentMessage(messageData);

    this.notifyBotServer(message);
  }

  getCurrentMessage(messageData) {
    const {action} = messageData;
    const messageGeneratorStore = {
      'card-to-mobile': getCardToMobileMessage,
      'card-to-card': getCardToCardMessage
    };

    return messageGeneratorStore[action](messageData)
      .replace(/ +(?= )/g, '');
  }
}

module.exports = new BotConnection(botHost);
