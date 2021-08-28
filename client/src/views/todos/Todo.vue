<template>
    <div class="p-5">
        <div>
            <tcf-form-input 
                title="Title"
                v-model="todo.title"
                inputName="title"
                data-vv-as="title"
                :v-validate="validations.title"
            />
            <tcf-form-select 
                title="Status"
                v-model="todo.status"
                inputName="status"
                data-vv-as="status"
                :v-validate="validations.status"
                :options="statusOptions"
            />
            <div class="p-2 text-right">
                <button 
                    class="btn btn-danger"
                    @click="deleteTodo"
                >
                Delete
                </button>
                <button 
                    class="btn btn-success"
                    @click="save"
                >
                Save
                </button>
            </div>
        </div>
        <div>
            <h5 class="p-2">Extra*</h5>
            <tcf-form-select 
                title="Merge with"
                v-model="mergeWith"
                inputName="status"
                data-vv-as="status"
                :v-validate="validations.status"
                :options="mergebleTodosOptions"
                :disabled="!mergebleTodosOptions.length"
            />
            <div class="p-2 text-right">
                <button 
                    class="btn btn-warning"
                    @click="merege"
                >
                Merge
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    import validations from './todos-validations';
    import { TodosRoutes } from '@/constants/routes/TodosRoutes';
    import { mapActions, mapGetters } from 'vuex';

    export default {
        provide() {
            return {
                parentValidator: this.$validator
            }
        },
        data() {
            return {
                validations: validations,
                statusOptions: [
                    { value: 'todo', text: 'Todo' },
                    { value: 'done', text: 'Done' },
                ],
                mergebleTodosOptions: [],
                todo: {},
                mergeWith: null,
                TodosRoutes: TodosRoutes
            }
        },
        mounted() {
            this.GET_TODO(this.$route.params.todo_id);
            this.GET_ALL_MERGEABLE_TODOS({ except: this.$route.params.todo_id });
        },
        computed: {
            ...mapGetters(['TODO', 'MERGEBLE_TODOS'])
        },
        methods: {
            ...mapActions(['GET_TODO', 'DELETE_TODO', 'UPDATE_TODO', 'GET_ALL_MERGEABLE_TODOS', 'MERGE_TODOS']),
            save() {
                this.$validator.validateAll()
                .then(res => {
                    if(res) {
                        this.UPDATE_TODO({
                            todoId: this.$route.params.todo_id,
                            params: {
                                title: this.todo.title,
                                status: this.todo.status
                            }
                        })
                        .then(() => {
                            this.$toast.success('Todo has been updated successfully.');
                        })
                        .catch(({response}) => {
                            this.$toast.error(response.data.message);
                        })
                    }
                })
            },
            deleteTodo() {
                const confirm = window.confirm('Are you sure?');

                confirm && this.DELETE_TODO(this.$route.params.todo_id)
                .then(() => {
                    this.$toast.success('Todo deleted successfully.');
                    this.$router.push({ name: this.TodosRoutes.Todos.name });
                })
                .catch(({response}) => {
                    this.$toast.error(response.data.message);
                })
            },
            merege() {
                this.MERGE_TODOS({
                    todoId: this.$route.params.todo_id,
                    params: {
                        mergeWith: this.mergeWith,
                    }
                })
                .then(() => {
                    this.$toast.success('Merged successfully.');
                    this.GET_TODO(this.$route.params.todo_id);
                    this.GET_ALL_MERGEABLE_TODOS({ except: this.$route.params.todo_id });
                })
                .catch(({response}) => {
                    this.$toast.error(response.data.message);
                })
            }
        },
        watch: {
            TODO(todo) {
                this.todo = todo;
            },
            MERGEBLE_TODOS(todos) {
                this.mergebleTodosOptions = todos.map(item => {
                    return {
                        value: item._id,
                        text: item.title
                    }
                });
                
                this.mergeWith = this.mergebleTodosOptions[0] && this.mergebleTodosOptions[0].value
            }
        }
    }
</script>

<style>

</style>