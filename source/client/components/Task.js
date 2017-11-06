import React, {Component} from 'react';
import PropTypes from 'prop-types';

import TaskConstructor from './TaskConstructor';
import TaskSuccessApply from './TaskSuccessApply';

import {Container50Percent} from './';


/**
 * строковые литералы кода
 */
const CodeStrings = {

    stateStages: {
        constructor: 'constructor',
        success: 'success',
    }
};


/**
 * Класс компонента MobilePayment
 */
class Task extends Component {
    /**
     * Конструктор
     * @param {Object} props свойства компонента MobilePayment
     */
    constructor(props) {
        super(props);

        this.state = {
            stage: CodeStrings.stateStages.constructor
        };
    }

    /**
     * Обработка успешного добавления задачи
     * @param {Object} newTask - данные о транзакции
     */
    onAddTaskSuccess(newTask) {


        this.setState({
            stage: CodeStrings.stateStages.success,
            task: newTask
        });

        this.props.onTask();
    }

    /**
     * Повторить платеж
     */
    repeatAddTask() {

        this.setState({
            stage: CodeStrings.stateStages.constructor
        });
    }

    /**
     * Рендер компонента
     *
     * @override
     * @returns {JSX}
     */
    render() {

        const {activeCard, inactiveCardsList} = this.props;

        if (this.state.stage === CodeStrings.stateStages.success) {

            return (
                <Container50Percent>
                    <TaskSuccessApply
                        newTask={this.state.task}
                        repeatAddTask={() => this.repeatAddTask()}/>
                </Container50Percent>
            );
        }

        return (
            <Container50Percent>
                <TaskConstructor
                    activeCard={activeCard}
                    inactiveCardsList={inactiveCardsList}
                    onAddTaskSuccess={(newTask) => this.onAddTaskSuccess(newTask)}/>
            </Container50Percent>
        );
    }
}

Task.propTypes = {
    activeCard: PropTypes.shape({
        id: PropTypes.number,
        theme: PropTypes.object
    }).isRequired,
    onTask: PropTypes.func.isRequired
};

export default Task;
