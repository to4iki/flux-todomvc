'use strict';

import React from 'react';
import store from '../stores/TodoStore';
import Header from './Header';
import MainSection from './MainSection';
import Footer from './Footer';

function getTodoState() {
    return {
        allTodos: store.getAll(),
        areAllComplete: store.areAllComplete()
    };
}

export default class TodoApp extends React.Component {

    constructor(props) {
        super(props);

        this.state = getTodoState();
    }

    render() {
        return (
            <div>
                <Header />
                <MainSection
                    allTodos={this.state.allTodos}
                    areAllComplete={this.state.areAllComplete}
                />
                <Footer allTodos={this.state.allTodos} />
            </div>
        );
    }

    componentWillUnmount() {
        store.removeChangeListener(this._onChange.bind(this));
    }

    componentDidMount() {
        store.addChangeListener(this._onChange.bind(this));
    }

    _onChange() {
        this.setState(getTodoState());
    }
}
