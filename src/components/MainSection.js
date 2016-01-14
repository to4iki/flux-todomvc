'use strict';

import React from 'react';
import todoActions from '../actions/TodoAction';
import TodoItem from './TodoItem';

export default class MainSection extends React.Component {

    static get propTypes() {
        return {
            allTodos: React.PropTypes.object.isRequired,
            areAllComplete: React.PropTypes.bool.isRequired
        };
    }

    constructor(props) {
        super(props);
    }

    render() {
        if (!this._hasTodo()) {
            return null;
        }

        let todos = this._getAllTodos();

        return (
            <section id="main">
                <input
                    id="toggle-all"
                    type="checkbox"
                    onChange={this.handleChange.bind(this)}
                    checked={this.props.areAllComplete ? 'checked' : ''}
                />
                <label htmlFor="toggle-all">Mark all as complete</label>
                <ul id="todo-list">{todos}</ul>
            </section>
        );
    }

    _getAllTodos() {
        let allTodos = this.props.allTodos;
        let todos = [];

        for (let key in allTodos) {
            todos.push(<TodoItem key={key} todo={allTodos[key]} />);
        }

        return todos;
    }

    _hasTodo() {
        return Object.keys(this.props.allTodos).length > 0;
    }

    handleChange() {
        todoActions.toggleCompleteAll();
    }
}
