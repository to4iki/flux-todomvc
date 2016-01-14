'use strict';

import AppDispatcher from '../dispatcher/AppDispatcher';
import TodoConstants from '../constants/Todo';
import todoAPI from '../utils/TodoAPI';

export default {

    /**
     * User Actions
     */

    create: (text) => {
        AppDispatcher.dispatch({
            actionType: TodoConstants.CREATE,
            text: text
        });

        todoAPI.save(text);
    },

    updateText: (id, text) => {
        AppDispatcher.dispatch({
            actionType: TodoConstants.UPDATE_TEXT,
            id: id,
            text: text
        });

        todoAPI.update({
            id: id,
            text: text
        });
    },

    toggleComplete: (todo) => {
        let id = todo.id;
        let actionType = todo.complete ? TodoConstants.UNDO_COMPLETE : TodoConstants.COMPLETE;

        AppDispatcher.dispatch({
            actionType: actionType,
            id: id
        });

        todoAPI.update({
            id: todo.id,
            text: todo.text,
            complete: !todo.complete
        });
    },

    toggleCompleteAll: () => {
        AppDispatcher.dispatch({
            actionType: TodoConstants.TOGGLE_COMPLETE_ALL
        });

        todoAPI.toggleComplete();
    },

    destroy: (id) => {
        AppDispatcher.dispatch({
            actionType: TodoConstants.DESTROY,
            id: id
        });

        todoAPI.destroy(id);
    },

    destroyCompleted: () => {
        AppDispatcher.dispatch({
            actionType: TodoConstants.DESTROY_COMPLETED
        });

        todoAPI.destroyCompleted();
    },

    /**
     * TodoAPI Actions
     */

    fetchTodos: () => {
        todoAPI.fetch((todos) => {
            AppDispatcher.dispatch({
                actionType: TodoConstants.FETCH_TODOS,
                todos: todos
            });
        });
    },

    syncTodos: (todos) => {
        AppDispatcher.dispatch({
            actionType: TodoConstants.SYNC_TODOS,
            todos: todos
        });
    }
}
