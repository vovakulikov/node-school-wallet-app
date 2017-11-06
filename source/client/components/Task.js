import React, {Component} from 'react';
import PropTypes from 'prop-types';

import TaskConstructor from './TaskConstructor';
import TaskSuccessApply from './TaskSuccessApply';


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
     * @param {Object} task - данные о транзакции
     */
    onAddTaskSuccess(task) {

        this.props.onTransaction();

        this.setState({
            stage: CodeStrings.stateStages.success,
            task
        });
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

           /* return (
                <TaskSuccessApply
                    activeCard={activeCard}
                    transaction={this.state.task}
                    repeatPayment={() => this.repeatAddTask()} />
            );*/
        }

        return (
            <TaskConstructor
                activeCard={activeCard}
                inactiveCardsList={inactiveCardsList}
                onAddTaskSuccess={(task) => this.onAddTaskSuccess(task)} />
        );
    }
}

Task.propTypes = {
    activeCard: PropTypes.shape({
        id: PropTypes.number,
        theme: PropTypes.object
    }).isRequired,
    onTransaction: PropTypes.func.isRequired
};

export default Task;
