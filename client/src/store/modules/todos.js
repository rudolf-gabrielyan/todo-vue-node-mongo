import {RepositoryFactory} from "@/api/RepositoryFactory";

export default {
    state: {
        todos: [],
        todo: null,
        mergebleTodos: []
    },
    mutations: {
        SET_TODOS(state, payload) {
            state.todos = payload;
        },
        SET_TODO(state, payload) {
            state.todo = payload;
        },
        SET_MERGEBLE_TODOS(state, payload) {
            state.mergebleTodos = payload;
        }
    },
    actions: {
        GET_TODOS(context, params) {
            return RepositoryFactory.get('todos').show(params).then(({ data }) => {
                context.commit('SET_TODOS', data);
                return data;
            })
        },
        CREATE_TODO(context, params) {
            return RepositoryFactory.get('todos').create(params).then(({ data }) => {
                return data;
            })
        },
        GET_TODO(context, todoId) {
            return RepositoryFactory.get('todos').showOne(todoId).then(({ data }) => {
                context.commit('SET_TODO', data);
                return data;
            })
        },
        UPDATE_TODO(context, data) {
            return RepositoryFactory.get('todos').update(data).then(({ data }) => {
                return data;
            })
        },
        DELETE_TODO(context, todoId) {
            return RepositoryFactory.get('todos').delete(todoId).then(({ data }) => {
                return data;
            })
        },
        DELETE_ALL_TODOS(context) {
            return RepositoryFactory.get('todos').deleteAll().then(({ data }) => {
                context.commit('SET_TODOS', []);
                return data;
            })
        },
        GET_ALL_MERGEABLE_TODOS(context, params) {
            return RepositoryFactory.get('todos').showAllMergeableTodos(params).then(({ data }) => {
                context.commit('SET_MERGEBLE_TODOS', data);
                return data;
            })
        },
        MERGE_TODOS(context, data) {
            return RepositoryFactory.get('todos').merge(data).then(({ data }) => {
                return data;
            })
        }
    },
    getters: {
        TODOS(state) {
            return state.todos;
        },
        TODO(state) {
            return state.todo
        },
        MERGEBLE_TODOS(state) {
            return state.mergebleTodos
        }
    }
}
