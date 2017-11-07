import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'emotion/react';

import PrepaidContract from './PrepaidContract';
import PrepaidSuccess from './PrepaidSuccess';

import {Container50Percent} from './';

/**
 * Класс компонента Prepaid
 */
class Prepaid extends Component {
    /**
     * Конструктор
     * @param {Object} props свойства компонента Prepaid
     */
    constructor(props) {
        super(props);

        this.state = {stage: 'contract'};
    }

    /**
     * Обработка успешного платежа
     * @param {Object} transaction данные о транзакции
     */
    onPaymentSuccess(transaction) {
        this.props.onTransaction();
        this.setState({
            stage: 'success',
            transaction
        });
    }

    /**
     * Повторить платеж
     */
    repeatPayment() {
        this.setState({stage: 'contract'});
    }

    /**
     * Функция отрисовки компонента
     * @returns {JSX}
     */
    render() {
        const {transaction} = this.state;
        const {activeCard, inactiveCardsList} = this.props;

        if (this.state.stage === 'success') {
            return (
                <Container50Percent>
                    <PrepaidSuccess transaction={transaction} repeatPayment={() => this.repeatPayment()}/>
                </Container50Percent>
            );
        }

        return (
            <Container50Percent>
                <PrepaidContract
                    activeCard={activeCard}
                    inactiveCardsList={inactiveCardsList}
                    onPaymentSuccess={(transaction) => this.onPaymentSuccess(transaction)}/>
            </Container50Percent>
        );
    }
}

Prepaid.propTypes = {
    activeCard: PropTypes.shape({
        id: PropTypes.number
    }).isRequired,
    inactiveCardsList: PropTypes.arrayOf(PropTypes.object).isRequired,
    onTransaction: PropTypes.func.isRequired
};

export default Prepaid;
