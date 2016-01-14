'use strict';

import {EventEmitter} from 'events';
import assign from 'object-assign';
import AppDispatcher from '../dispatcher/AppDispatcher';
import TodoConstants from '../constants/Todo';
import gen from '../utils/IdGen'

const CHANGE_EVENT = 'change';

let _todos = {};

function create(text) {
    let id = gen();
    _todos[id] = {
        'id': id,
        complete: false,
        text: text,
    };
}

function update(id, updates) {
    _todos[id] = assign({}, _todos[id], updates);
}

function updateAll(updates) {
    for (let id in _todos) {
        update(id, updates);
    }
}

function destroy(id) {
    delete _todos[id];
}

function destroyCompleted() {
    for (let id in _todos) {
        if (_todos[id].complete) {
            destroy(id);
        }
    }
}

class TodoStore extends EventEmitter {

    constructor() {
        super();

        AppDispatcher.register(this.handler.bind(this));
    }

    getAll() {
        return _todos;
    }

    areAllComplete() {
        for (let id in _todos) {
            if (!_todos[id].complete) {
                return false;
            }
        }
        return true;
    }

    emitChange() {
        this.emit(CHANGE_EVENT);
    }

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    }

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }

    /**
     * Register callback to handle all updates
     *
     * @param  {Object} action
     */
    handler(action) {
        let text;

        switch (action.actionType) {
            case TodoConstants.CREATE:
                text = action.text.trim();
                if (text !== '') {
                    create(text);
                    this.emitChange();
                }
                break;

            case TodoConstants.UPDATE_TEXT:
                text = action.text.trim();
                if (text !== '') {
                    update(action.id, {
                        text: text
                    });
                    this.emitChange();
                }
                break;

            case TodoConstants.COMPLETE:
                update(action.id, {
                    complete: true
                });
                this.emitChange();
                break;

            case TodoConstants.UNDO_COMPLETE:
                update(action.id, {
                    complete: false
                });
                this.emitChange();
                break;

            case TodoConstants.TOGGLE_COMPLETE_ALL:
                if (this.areAllComplete()) {
                    updateAll({
                        complete: false
                    });
                } else {
                    updateAll({
                        complete: true
                    });
                }
                this.emitChange();
                break;

            case TodoConstants.DESTROY:
                destroy(action.id);
                this.emitChange();
                break;

            case TodoConstants.DESTROY_COMPLETED:
                destroyCompleted();
                this.emitChange();
                break;

            case TodoConstants.FETCH_TODOS:
            case TodoConstants.SYNC_TODOS:
                _todos = action.todos
                this.emitChange();
                break;

            default:
        }
    }
}

// Singleton
const store = new TodoStore();

export default store;
