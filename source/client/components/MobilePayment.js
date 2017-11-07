import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'emotion/react';

import MobilePaymentContract from './MobilePaymentContract';
import MobilePaymentSuccess from './MobilePaymentSuccess';

import {Container50Percent} from './';

/**
 * Класс компонента MobilePayment
 */
class MobilePayment extends Component {
    /**
     * Конструктор
     * @param {Object} props свойства компонента MobilePayment
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
     * Рендер компонента
     *
     * @override
     * @returns {JSX}
     */
    render() {
        const {activeCard} = this.props;

        if (this.state.stage === 'success') {
            return (
                <Container50Percent>
                    <MobilePaymentSuccess
                        activeCard={activeCard}
                        transaction={this.state.transaction}
                        repeatPayment={() => this.repeatPayment()}/>
                </Container50Percent>
            );
        }

        return (
            <Container50Percent>
                <MobilePaymentContract
                    activeCard={activeCard}
                    onPaymentSuccess={(transaction) => this.onPaymentSuccess(transaction)}/>
            </Container50Percent>
        );
    }
}

MobilePayment.propTypes = {
    activeCard: PropTypes.shape({
        id: PropTypes.number,
        theme: PropTypes.object
    }).isRequired,
    onTransaction: PropTypes.func.isRequired
};

export default MobilePayment;
