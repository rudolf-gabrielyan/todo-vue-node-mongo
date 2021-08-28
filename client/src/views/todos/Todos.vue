<template>
    <div>
        <filters @onFilter="handleFilter" />
        <todo-list :todos="TODOS" />
        <div class="p-2 text-right">
            <button
                class="btn btn-success"
                @click="modals.addNewTodo = true"
            >
            +
            </button>
            <button 
                class="btn btn-danger"
                @click="deleteAll"
                :disabled="!TODOS.length"
            >
            Delete All
            </button>
        </div>
        <add-new-todo-modal 
            v-if="modals.addNewTodo"
            title="Add todo"
            :show="modals.addNewTodo"
        />
    </div>
</template>

<script>
    import TodoList from './partials/components/TodoList.vue';
    import AddNewTodoModal from './partials/modals/AddNewTodoModal.vue';
    import Filters from './partials/components/Filters.vue';
    import { TodosRoutes } from '@/constants/routes/TodosRoutes';
    import { mapActions, mapGetters } from 'vuex';

    export default {
        components: { 
            TodoList,
            AddNewTodoModal,
            Filters
        },
        data(){
            return {
                modals: {
                    addNewTodo: false
                },
                TodosRoutes: TodosRoutes
            }
        },
        beforeMount() {
            this.$on('modalToggle', (modal) => {
                this.modals[modal.name] = modal.val;
            })
        },
        mounted() {
            this.GET_TODOS({ status: this.$route.query.status });
        },
        computed: {
            ...mapGetters(['TODOS'])
        },
        methods: {
            ...mapActions(['GET_TODOS', 'DELETE_ALL_TODOS']),
            deleteAll() {
                const confirm = window.confirm('Are you sure?');

                confirm && this.DELETE_ALL_TODOS()
                .then(() => {
                    this.$toast.success('Successfully deleted.');
                    this.GET_TODOS();
                })
                .catch(({response}) => {
                    this.$toast.error(response.data.message);
                })
            },
            handleFilter(filters) {
                filters.status ? this.$router.push({ query: filters }): this.$router.push({ name: this.TodosRoutes.Todos.name });
                this.GET_TODOS(filters);
            }
        }
    }
</script>
