import React from 'react';
import PropTypes from 'prop-types';
import styled from 'emotion/react';

import {Island, Container50Percent} from './';

const TaskListLayout = styled(Island)`
	height: 400px;
	overflow-y: scroll;
	padding: 0;
	background-color: rgba(0, 0, 0, 0.05);
	display: flex;
	flex-direction: column;
`;

const TaskListEmpty = styled.div`
	margin: 10px 0 10px 12px;
`;

const TaskListTitle = styled.div`
	padding-left: 12px;
	color: rgba(0, 0, 0, 0.4);
	font-size: 15px;
	line-height: 30px;
	text-transform: uppercase;
`;

const TaskListContent = styled.div`
	color: rgba(0, 0, 0, 0.4);
	font-size: 15px;
	line-height: 30px;
	text-transform: uppercase;
`;

const TaskItem = styled.div`
	display: flex;
	justify-content: space-around;
	align-items: center;
	height: 74px;
	font-size: 15px;
	white-space: nowrap;
	min-height: 74px;

	&:nth-child(even) {
		background-color: #fff;
	}

	&:nth-child(odd) {
		background-color: rgba(255, 255, 255, 0.72);
	}
`;

const TaskItemTitle = styled.div`
    width: 220px;
	overflow: hidden;
	text-overflow: ellipsis;
`;

const TaskIconContainer = styled.div`
	width: 50px;
	height: 50px;
	background-color: #105380;
	border-radius: 50%;
`;


const TaskIcon = styled.div`
	width: 44px;
	height: 44px;
	background-image: url(/assets/round-check.svg);
	background-size: contain;
    background-repeat: no-repeat;
    margin: 3px auto;
`;

const TaskItemPeriod = styled.div`
	width: 105px;
`;

const TaskItemAmount = styled.div`
	min-width: 60px;
	max-width: 150px;
	overflow: hidden;
	text-overflow: ellipsis;
	font-weight: bold;
`;

const TaskList = ({cardTasks, inactiveCardsList}) => {

    const getTaskItemTitle = (taskItem) => {

        if (!taskItem.label) {

            let type = 'Задача';
            let number = 'Цель';

            switch (taskItem.target.type) {
                case 'paymentMobile': {
                    type = 'Телефон';
                    number = taskItem.target.number;
                    break;
                }
                case 'prepaidCard': {
                    type = 'Пополнение';
                    break;
                }
                case 'card2Card': {
                    type = 'Карта';

                    const targetCard = inactiveCardsList.find((card) => +card.id === +taskItem.target.number);

                    number = targetCard.number;
                    break;
                }
            }

            return `${type}: ${number}`;

        }

        return taskItem.label;
    };


    const getTaskItemPeriod = (taskItem) => {

        const hour = taskItem.executionTime.hour > 9 ? taskItem.executionTime.hour : '0' + taskItem.executionTime.hour;
        const minute = taskItem.executionTime.minute > 9 ? taskItem.executionTime.minute : '0' + taskItem.executionTime.minute;


        return `${taskItem.period.type[0].toUpperCase()}-${taskItem.period.value} | ${hour}:${minute}`
    };


    const getContent = (list) => {

        const content = list.map((item, index) => {

            return (<TaskItem key={index}>
                <TaskIconContainer>
                    <TaskIcon/>
                </TaskIconContainer>
                <TaskItemTitle>
                    {getTaskItemTitle(item)}
                </TaskItemTitle>
                <TaskItemPeriod>
                    {getTaskItemPeriod(item)}
                </TaskItemPeriod>
                <TaskItemAmount>
                    {`+${item.amount} ₽`}
                </TaskItemAmount>
            </TaskItem>);
        });

        return content.length === 0
            ? <TaskListContent><TaskListEmpty>Список задач пуст</TaskListEmpty></TaskListContent>
            : <TaskListContent>{content}</TaskListContent>;
    };

    return (
        <Container50Percent>
            <TaskListLayout>
                <TaskListTitle>Добавленные задачи:</TaskListTitle>
                {getContent(cardTasks)}
            </TaskListLayout>
        </Container50Percent>
    );
};

TaskList.propTypes = {
    cardTasks: PropTypes.arrayOf(PropTypes.object).isRequired,
    inactiveCardsList: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default TaskList;
