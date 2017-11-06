import React from 'react';
import styled from 'emotion/react';
import PropTypes from 'prop-types';

import {Island} from './';

const AddTaskSuccessLayout = styled(Island)`
	background: #105380;
	position: relative;
	color: #fff;
`;

const Underline = styled.div`
	height: 1px;
	margin-bottom: 20px;
	background-color: rgba(0, 0, 0, 0.16);
`;

const HeaderContainer = styled.div`
    margin-bottom: 20px;
`;

const SuccessIcon = styled.div`
	width: 48px;
	height: 48px;
	background-image: url(/assets/round-check.svg);
	position: absolute;
	top: 27;
	right: 32;
`;

const Header = styled.div`
	font-size: 24px;
`;

const PreviewSection = styled.div`
	margin-bottom: 20px;
`;

const SectionLabel = styled.div`
	font-size: 15px;
	display: inline-block;
	width: 30%;
	padding-right: 10px;
`;

const SectionValue = styled.div`
	font-size: 15px;
	display: inline-block;
	width: 70%;
`;

const Notification = styled.div`
	margin-bottom: 40px;
	font-size: 15px;
`;

const RepeatAddTask = styled.button`
	font-size: 13px;
	background-color: rgba(0, 0, 0, 0.08);
	height: 42px;
	display: flex;
	justify-content: center;
	align-items: center;
	border: none;
	width: 100%;
	position: absolute;
	left: 0;
	bottom: 0;
	cursor: pointer;
	text-transform: uppercase;
`;

const AddTaskSuccess = ({newTask, inactiveCardsList, repeatAddTask}) => {


    const getTaskAction = (task) => {

        let action = '';

        switch (task.target.type) {
            case 'paymentMobile': {
                action = 'Пополнение баланса телефона';
                break;
            }
            case 'card2Card': {
                action = 'Пополнение баланса карты';
                break;
            }
        }

        return `${action}`;

    };


    const getTaskTarget = (task) => {

            let targetNumber = '';

            switch (task.target.type) {
                case 'paymentMobile': {
                    targetNumber = task.target.number;
                    break;
                }
                case 'card2Card': {
                    const targetCard = inactiveCardsList.find((card) => +card.id === +task.target.number);
                    targetNumber = targetCard.number;
                    break;
                }
            }

            return targetNumber;
    };


    const getTaskPeriod = (task) => {

        const weekdays = [
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
        ];

        const hour = task.executionTime.hour > 9 ? task.executionTime.hour : '0' + task.executionTime.hour;
        const minute = task.executionTime.minute > 9 ? task.executionTime.minute : '0' + task.executionTime.minute;

        if (task.period.type === 'month') {

            return `Каждый месяц "${task.period.value}" числа в ${hour}:${minute}`;

        } else if (task.period.type === 'week') {

            const weekday = weekdays.find(day => day.value === task.period.value);

            return `Каждую неделю в "${weekday.label.toLowerCase()}" в ${hour}:${minute}`;
        }
    };

    return (
        <AddTaskSuccessLayout>
            <HeaderContainer>
                <SuccessIcon/>
                <Header>Задача успешно добавлена!</Header>
            </HeaderContainer>
            <Underline/>
            {newTask.label
                ?<PreviewSection>
                    <SectionLabel>Лэйбл:</SectionLabel>
                    <SectionValue>{newTask.label}</SectionValue>
                </PreviewSection>
                : ''
            }
            <PreviewSection>
                <SectionLabel>Действие:</SectionLabel>
                <SectionValue>{getTaskAction(newTask)}</SectionValue>
            </PreviewSection>
            <PreviewSection>
                <SectionLabel>Номер:</SectionLabel>
                <SectionValue>{getTaskTarget(newTask)}</SectionValue>
            </PreviewSection>
            <PreviewSection>
                <SectionLabel>Периодичность:</SectionLabel>
                <SectionValue>{getTaskPeriod(newTask)}</SectionValue>
            </PreviewSection>
            <PreviewSection>
                <SectionLabel>Сумма:</SectionLabel>
                <SectionValue>{`${newTask.amount} ₽`}</SectionValue>
            </PreviewSection>
            <Underline/>
            <Notification>
                При выполнении задачи, вам будет выслано опевещение "Telegram" на привязанный номер телефона.
            </Notification>
            <RepeatAddTask onClick={repeatAddTask}>Добавить еще задачу</RepeatAddTask>
        </AddTaskSuccessLayout>
    );
};

AddTaskSuccess.propTypes = {
    newTask: PropTypes.shape({
        label: PropTypes.string,
    }).isRequired,
    inactiveCardsList: PropTypes.arrayOf(PropTypes.object).isRequired,
    repeatAddTask: PropTypes.func.isRequired
};

export default AddTaskSuccess;
