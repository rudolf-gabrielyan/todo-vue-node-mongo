import Repository from './../Repository';
import { withParams } from '../helpers/main';

export default {
    create(params) {
        return Repository.post('/todos', params);
    },
    show(params) {
        return Repository.get(withParams(params, '/todos'));
    },
    showOne(todoId) {
        return Repository.get(`/todos/${todoId}`);
    },
    delete(todoId) {
        return Repository.delete(`/todos/${todoId}`);
    },
    update({todoId, params}) {
        return Repository.put(`/todos/${todoId}`, params);
    },
    deleteAll() {
        return Repository.delete('/todos');
    },
    showAllMergeableTodos(params) {
        return Repository.get(withParams(params, '/mergeable-todos'));
    },
    merge({todoId, params}) {
        return Repository.put(`/merge/${todoId}`, params);
    }
}
