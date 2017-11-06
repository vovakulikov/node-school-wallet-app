const axios = require('axios');
const {botHost} = require('../config');

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
      'card-to-mobile': this.getCardToMobileMessage,
      'card-to-card': this.getCardToCardMessage
    };

    return messageGeneratorStore[action](messageData)
      .replace(/ +(?= )/g, '');
  }

  getCardToMobileMessage({
    card, phoneNumber, commission, sum, date
  }) {
    return `
          **** *Оплата мобильного телефона* ****
          С карты ${card.cardNumber} была произведена 
          оплата мобильного телефона
          ${phoneNumber} на сумму ${sum} рублей.
          Комиссия при оплате составила ${commission} рубля.
          Время операции по Москве - ${date}.
          Текущий счет карты ${card.balance} рублей`;
  }

  getCardToCardMessage({
    sourceCard, targetCard, sum, date
  }) {
    return `
        **** Перевод с карты на карту ****
        ${date} по Москве с карты ${sourceCard.cardNumber} 
        на карту ${targetCard.cardNumber} было переведено 
        ${sum} рублей. 
        Текущий счет карты ${targetCard.balance} рублей
        `;
  }
}

module.exports = new BotConnection(botHost);
