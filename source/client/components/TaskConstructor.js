import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'emotion/react';
import axios from 'axios';

import {Island, Title, Button, Input, Select, Card} from './';

const TaskConstructorLayout = styled(Island)`
	background: #105380;
`;

const TaskConstructorTitle = styled(Title)`
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

const TaskAddButtonContainer = styled.div`
    text-align: right;
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
    constructor(props) {
        super(props);
    }

    onChange(event) {

        const {onChange} = this.props;

        if (onChange) {
            onChange(event);
        }
    }

    render() {
        return (
            <InputField>
                <Label>Номер телефона:</Label>
                <SimpleInput
                    name='targetNumber'
                    onChange={(event) => this.onChange(event)}/>
            </InputField>
        )
    }
}


class MonthDaySelect extends Component {
    constructor(props) {
        super(props);
    }

    onChange(value) {

        const {onChange} = this.props;

        if (onChange) {

            onChange(value);
        }
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
                    defaultValue='1'
                    onChange={(value) => {
                        this.onChange(value)
                    }}>
                    {selectContent}
                </SimpleSelect>
            </InputField>
        )
    }
}


class WeekDaySelect extends Component {
    constructor(props) {
        super(props);
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

    onChange(value) {

        const {onChange} = this.props;

        if (onChange) {

            onChange(value);
        }
    }

    render() {

        return (
            <InputField>
                <Label>День недели:</Label>
                <SimpleSelect
                    defaultValue={this.weekdays[0].value}
                    onChange={(value) => {
                        this.onChange(value)
                    }}>
                    {this.weekdays.map((weekday, index) => <Select.Option key={index}
                                                                          value={weekday.value}>{weekday.label}</Select.Option>)}
                </SimpleSelect>
            </InputField>
        )
    }
}


class TimesInput extends Component {
    constructor(props) {
        super(props);

        this.executionTimeHour = 'executionTimeHour';
        this.executionTimeMinute = 'executionTimeMinute';
    }

    onChange(name, value) {

        const {onChange} = this.props;

        if (onChange) {
            onChange(name, value);
        }
    }

    render() {

        let hourSelectContent = [];
        let minuteSelectContent = [];


        for (let i = 0; i <= 60; i++) {

            const value = i > 9 ? i : '0' + i;

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
                            defaultValue='00'
                            onChange={(value) => {
                                this.onChange(this.executionTimeHour, value)
                            }}>
                            {hourSelectContent}
                        </TimeSelect>
                    </TimeSelectContainer>
                    <TimeSelectContainer>
                        <SecondLabel>мин.</SecondLabel>
                        <TimeSelect
                            name='targetType'
                            defaultValue='00'
                            onChange={(value) => {
                                this.onChange(this.executionTimeMinute, value)
                            }}>
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
                type: 'paymentMobile',
                label: 'Баланс мобильного телефона',
                defaultNumber: ''
            },
            {
                type: 'card2Card',
                label: 'Баланс карты',
                defaultNumber: this.props.inactiveCardsList[0] ? this.props.inactiveCardsList[0].id.toString() : ''
            },
        ];

        this.periodTypes = [
            {
                type: 'month',
                label: 'Месяц',
                defaultValue: '1'
            },
            {
                type: 'week',
                label: 'Неделю',
                defaultValue: 'mon'
            },
        ];

        this.defaultState = {
            label: '',
            targetType: this.targetTypes[0].type,
            targetNumber: this.targetTypes[0].defaultNumber,
            amount: '0',
            periodType: this.periodTypes[0].type,
            periodValue: this.periodTypes[0].defaultValue,
            executionTimeHour: '00',
            executionTimeMinute: '00'
        };


        this.state = JSON.parse(JSON.stringify(this.defaultState));
    }

    /**
     * Обработчик переключения типа задачи
     *
     * @param {string} currentTargetType индекс выбранной карты
     */
    onTargetTypeChange(newTargetType) {

        let defaultTypeValue = this.targetTypes[0].defaultNumber;

        if (newTargetType === this.targetTypes[1].type) {
            defaultTypeValue = this.targetTypes[1].defaultNumber;
        }

        this.setState({targetType: newTargetType, targetNumber: defaultTypeValue});
    }

    /**
     * Обработчик переключения типа задачи
     *
     * @param {string} newPeriodType индекс выбранной карты
     */
    onPeriodTypeChange(newPeriodType) {

        let defaultPeriodValue = this.periodTypes[0].defaultValue;

        if (newPeriodType === this.periodTypes[1].type) {
            defaultPeriodValue = this.periodTypes[1].defaultValue;
        }

        this.setState({periodType: newPeriodType, periodValue: defaultPeriodValue});
    }

    /**
     * Обработчик переключения типа задачи
     *
     * @param {string} newPeriodType индекс выбранной карты
     */
    onPeriodValueChange(newPeriodType) {

        this.setState({periodValue: newPeriodType});
    }

    /**
     * Обработчик переключения типа задачи
     *
     * @param {string} currentIndex индекс выбранной карты
     */
    onCardChange(currentIndex) {

        const targetCard = this.props.inactiveCardsList.find((card, index) => +index === +currentIndex);

        this.setState({targetNumber: targetCard.id.toString()});
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
     * Обработчик переключения карты
     *
     * @param {Number} name индекс выбранной карты
     * @param {Number} value индекс выбранной карты
     */
    onSelectChange(name, value) {
        this.setState({[name]: value});
    }

    /**
     * Отправка формы
     * @param {Event} event событие отправки формы
     */
    onSubmitForm(event) {
        if (event) {
            event.preventDefault();
        }

        const taskData = {
            label: this.state.label,
            from: this.props.activeCard.id.toString(),
            target: {
                type: this.state.targetType,
                number: this.state.targetNumber
            },
            amount: this.state.amount,
            period: {
                type: this.state.periodType,
                value: this.state.periodValue
            },
            executionTime: {
                hour: this.state.executionTimeHour,
                minute: this.state.executionTimeMinute
            }
        };

        const isValidAmount = !isNaN(parseFloat(taskData.amount)) && isFinite(taskData.amount);

        if (!isValidAmount || taskData.amount === 0) {
            return;
        }

        if (taskData.target.type === this.targetTypes[1].type) {

            const isValidPhoneNumber = !isNaN(parseInt(taskData.target.number)) && isFinite(taskData.target.number);

            if (!isValidPhoneNumber || taskData.target.number === 0) {
                return;
            }
        }

        // this.props.onAddTaskSuccess(taskData);

        axios
            .post(`/cards/${taskData.from}/tasks`, taskData)
            .then((response) => {
                this.props.onAddTaskSuccess(response.data)
            });
    }

    /**
     * Рендер компонента
     *
     * @override
     * @returns {JSX}
     */
    render() {

        const {label, targetType, targetNumber, amount, periodType, periodValue, executionTimeHour, executionTimeMinute} = this.state;
        const {inactiveCardsList} = this.props;

        return (
            <TaskConstructorLayout>
                <form onSubmit={(event) => this.onSubmitForm(event)}>
                    <TaskConstructorTitle>Добавить задачу</TaskConstructorTitle>
                    <Underline/>
                    <InputField>
                        <Label>Лэйбл:</Label>
                        <SimpleInput name='label'
                                     onChange={(event) => this.onChangeInputValue(event)}/>
                    </InputField>
                    <Underline/>
                    <InputField>
                        <Label>Пополнить:</Label>
                        <SimpleSelect
                            defaultValue={targetType}
                            onChange={(targetType) => this.onTargetTypeChange(targetType)}>
                            {this.targetTypes.map((targetType, index) => (
                                <Select.Option key={index} value={`${targetType.type}`}>
                                    {targetType.label}
                                </Select.Option>
                            ))}
                        </SimpleSelect>
                    </InputField>
                    {this.state.targetType === this.targetTypes[1].type
                        ? <CardContainer>
                            <Card type='select'
                                  data={inactiveCardsList}
                                  onCardChange={(value) => {
                                      this.onCardChange(value)
                                  }}/>
                        </CardContainer>
                        : <TelephoneInput
                            onChange={(event) => this.onChangeInputValue(event)}/>}
                    <InputField>
                        <Label>На сумму:</Label>
                        <InputWithSecondLabelContainer>
                            <Currency>₽</Currency>
                            <InputSum
                                name='amount'
                                onChange={(event) => this.onChangeInputValue(event)}/>
                        </InputWithSecondLabelContainer>
                    </InputField>
                    <InputField>
                        <Label>Один раз в:</Label>
                        <SimpleSelect
                            defaultValue={periodType}
                            onChange={(periodType) => this.onPeriodTypeChange(periodType)}>
                            {this.periodTypes.map((periodType, index) => (
                                <Select.Option key={index} value={`${periodType.type}`}>
                                    {periodType.label}
                                </Select.Option>
                            ))}
                        </SimpleSelect>
                    </InputField>
                    {this.state.periodType === this.periodTypes[0].type
                        ? <MonthDaySelect onChange={(value) => {
                            this.onPeriodValueChange(value)
                        }}/>
                        : <WeekDaySelect onChange={(value) => {
                            this.onPeriodValueChange(value)
                        }}/>}
                    <TimesInput
                        onChange={(name, value) => {
                            this.onSelectChange(name, value)
                        }}/>
                    <Underline/>
                    <TaskAddButtonContainer>
                        <Button bgColor='#fff' textColor='#105380'>Добавить</Button>
                    </TaskAddButtonContainer>
                </form>
            </TaskConstructorLayout>
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
