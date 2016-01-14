'use strict';

import React from 'react';
import todoActions from '../actions/TodoAction';
import TodoTextInput from './TodoTextInput';

export default class Header extends React.Component {

    render() {
        return (
            <header id="header">
                <h1>todos</h1>
                <TodoTextInput
                    id="new-todo"
                    placeholder="What needs to be done?"
                    onSave={this.handleSave.bind(this)}
                 />
             </header>
        );
    }

    handleSave(text) {
        if (text.trim()) {
            todoActions.create(text);
        }
    }
}
