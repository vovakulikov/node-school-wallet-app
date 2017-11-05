import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'emotion/react';
import axios from 'axios';

import {Island, Title, Button, Input, Select, Card} from './';

const MobilePaymentLayout = styled(Island)`
	width: 440px;
	background: #108051;
`;

const MobilePaymentTitle = styled(Title)`
	color: #fff;
`;

const InputField = styled.div`
	display: block;
	margin-bottom: 26px;
`;

const Label = styled.div`
    display: inline-block;
    width: 40%;
	font-size: 15px;
	color: #fff;
`;

const InputWithSecondLabelContainer = styled.div`
    display: inline-block;
    position: relative;
    width: 60%;
    padding-right: 22px;
    
    > span {
        width: 13px;
    }
`;

const TimeSelectsContainer = styled.div`
    display: inline-block;
    position: relative;
    width: 60%;
`;

const TimeSelectContainer = styled.div`
    display: inline-block;
    position: relative;
    width: 50%;
    padding-right: 40px;
`;

const Currency = styled.span`
    display: block;
    position: absolute;
    right: 0;
	font-size: 13px;
	color: #fff;
	line-height: 36px;
	width: 13px;
`;

const SecondLabel = styled.div`
    display: block;
    position: absolute;
    right: 0;
	font-size: 13px;
	color: #fff;
	line-height: 36px;
	width: 32px;
`;

const CardContainer = styled.div`
    max-width: 260px;
	margin: 0 auto 30px;
`;

const Underline = styled.div`
	height: 1px;
	margin-bottom: 20px;
	background-color: rgba(0, 0, 0, 0.16);
`;

const PaymentButton = styled(Button)`
	float: right;
`;

const SimpleInput = styled(Input)`
	width: 60%;
`;

const SimpleSelect = styled(Select)`
    width: 60%;
`;

const TimeSelect = styled(Select)`
    width: 100%;
`;

const InputSum = styled(Input)`
    display: block;
	width: 100%;
`;



class TelephoneInput extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <InputField>
                <Label>Номер телефона:</Label>
                <SimpleInput
                    name='taskLabel'/>
            </InputField>
        )
    }
}


class MonthDaySelect extends Component {
    constructor() {
        super();
    }

    render() {


        let selectContent = [];

        for (let i = 1; i <= 31; i++) {


            selectContent.push(<Select.Option key={i} value={i.toString()}>{i}</Select.Option>)
        }


        return (
            <InputField>
                <Label>Число:</Label>
                <SimpleSelect
                    name='targetType'
                    defaultValue='1'>
                    {selectContent}
                </SimpleSelect>
            </InputField>
        )
    }
}


class WeekDaySelect extends Component {
    constructor() {
        super();
        this.weekdays = [
            {
                value: 'mon',
                label: 'Понедельник',
            },
            {
                value: 'tue',
                label: 'Вторник',
            },
            {
                value: 'wed',
                label: 'Среда',
            },
            {
                value: 'thu',
                label: 'Четверг',
            },
            {
                value: 'fri',
                label: 'Пятница',
            },
            {
                value: 'sat',
                label: 'Суббота',
            },
            {
                value: 'sun',
                label: 'Воскресенье',
            },
        ]
    }

    render() {

        return (
            <InputField>
                <Label>День недели:</Label>
                <SimpleSelect
                    name='targetType'
                    defaultValue={this.weekdays[0].value}>
                    {this.weekdays.map((weekday, index) => <Select.Option key={index} value={weekday.value}>{weekday.label}</Select.Option>)}
                </SimpleSelect>
            </InputField>
        )
    }
}


class TimesInput extends Component {
    constructor() {
        super();
    }

    render() {

        let hourSelectContent = [];
        let minuteSelectContent = [];


        for (let i = 0; i <= 60; i++) {

            const value = i > 10 ? i : '0' + i;

            if (i < 25) {
                hourSelectContent.push(<Select.Option key={i} value={value.toString()}>{value}</Select.Option>)
            }

            minuteSelectContent.push(<Select.Option key={i} value={value.toString()}>{value}</Select.Option>)
        }

        return (
            <InputField>
                <Label>Время:</Label>
                <TimeSelectsContainer>
                    <TimeSelectContainer>
                        <SecondLabel>час.</SecondLabel>
                        <TimeSelect
                            name='targetType'
                            defaultValue='00'>
                            {hourSelectContent}
                        </TimeSelect>
                    </TimeSelectContainer>
                    <TimeSelectContainer>
                        <SecondLabel>мин.</SecondLabel>
                        <TimeSelect
                            name='targetType'
                            defaultValue='00'>
                            {minuteSelectContent}
                        </TimeSelect>
                    </TimeSelectContainer>
                </TimeSelectsContainer>
            </InputField>
        );
    }
}

/**
 * Компонент TaskContract
 */
class TaskConstructor extends Component {
    /**
     * Конструктор
     * @param {Object} props свойства компонента TaskConstructor
     */
    constructor(props) {
        super(props);


        this.targetTypes = [
            {
                type: 'card',
                label: 'Баланс карты'
            },
            {
                type: 'mobile',
                label: 'Баланс мобильного телефона'
            },
        ];

        this.periodTypes = [
            {
                type: 'month',
                label: 'Месяц'
            },
            {
                type: 'week',
                label: 'Неделю'
            },
        ];


        this.state = {
            sum: 0,
            currentTargetType: this.targetTypes[0].type,
            currentPeriodType: this.periodTypes[0].type,
        };


    }

    /**
     * Обработчик переключения типа задачи
     *
     * @param {string} currentTargetType индекс выбранной карты
     */
    onTargetTypeChange(currentTargetType) {
        this.setState({currentTargetType});
    }

    /**
     * Обработчик переключения типа задачи
     *
     * @param {string} currentPeriodType индекс выбранной карты
     */
    onPeriodTypeChange(currentPeriodType) {
        this.setState({currentPeriodType});
    }

    /**
     * Обработка изменения значения в input
     * @param {Event} event событие изменения значения input
     */
    onChangeInputValue(event) {
        if (!event) {
            return;
        }

        const {name, value} = event.target;

        this.setState({
            [name]: value
        });
    }

    /**
     * Отправка формы
     * @param {Event} event событие отправки формы
     */
    onSubmitForm(event) {
        if (event) {
            event.preventDefault();
        }

        const {sum, phoneNumber, commission} = this.state;

        const isNumber = !isNaN(parseFloat(sum)) && isFinite(sum);
        if (!isNumber || sum === 0) {
            return;
        }

        const {activeCard} = this.props;

        axios
            .post(`/cards/${activeCard.id}/pay`, {phoneNumber, sum})
            .then(() => this.props.onAddTaskSuccess({sum, phoneNumber, commission}));
    }

    /**
     * Рендер компонента
     *
     * @override
     * @returns {JSX}
     */
    render() {

        const {currentTargetType, currentPeriodType} = this.state;
        const {inactiveCardsList} = this.props;

        return (
            <MobilePaymentLayout>
                <form onSubmit={(event) => this.onSubmitForm(event)}>
                    <MobilePaymentTitle>Запланировать действие</MobilePaymentTitle>
                    <Underline/>
                    <InputField>
                        <Label>Лэйбл:</Label>
                        <SimpleInput
                            name='taskLabel'/>
                    </InputField>
                    <Underline/>
                    <InputField>
                        <Label>Пополнить:</Label>
                        <SimpleSelect
                            name='targetType'
                            defaultValue={currentTargetType}
                            onChange={(currentTargetType) => this.onTargetTypeChange(currentTargetType)}>
                            {this.targetTypes.map((targetType, index) => (
                                <Select.Option key={index} value={`${targetType.type}`}>
                                    {targetType.label}
                                </Select.Option>
                            ))}
                        </SimpleSelect>
                    </InputField>
                    {this.state.currentTargetType === this.targetTypes[0].type
                        ? <CardContainer><Card type='select' data={inactiveCardsList}/></CardContainer>
                        : <TelephoneInput/>}
                    <InputField>
                        <Label>На сумму:</Label>
                        <InputWithSecondLabelContainer>
                            <Currency>₽</Currency>
                            <InputSum
                                name='sum'
                                value={this.state.sum}
                                onChange={(event) => this.onChangeInputValue(event)}/>
                        </InputWithSecondLabelContainer>
                    </InputField>
                    <InputField>
                        <Label>Один раз в:</Label>
                        <SimpleSelect
                            name='periodType'
                            defaultValue={currentPeriodType}
                            onChange={(currentPeriodType) => this.onPeriodTypeChange(currentPeriodType)}>
                            {this.periodTypes.map((periodType, index) => (
                                <Select.Option key={index} value={`${periodType.type}`}>
                                    {periodType.label}
                                </Select.Option>
                            ))}
                        </SimpleSelect>
                    </InputField>
                    {this.state.currentPeriodType === this.periodTypes[0].type
                        ? <MonthDaySelect/>
                        : <WeekDaySelect/>}
                    <TimesInput/>
                    <Underline/>
                    <PaymentButton bgColor='#fff' textColor='#108051'>Добавить</PaymentButton>
                </form>
            </MobilePaymentLayout>
        );
    }
}

TaskConstructor.propTypes = {
    activeCard: PropTypes.shape({
        id: PropTypes.number
    }).isRequired,
    onAddTaskSuccess: PropTypes.func.isRequired
};

export default TaskConstructor;
