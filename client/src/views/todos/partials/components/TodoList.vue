<template>
    <b-list-group>
        <b-list-group-item 
            v-for="todo in todos" 
            :key="todo._id"
            class="d-flex align-items-center justify-content-between"
        >
            <p class="m-0">{{ todo.title }}</p>
            <div>
                <button :class="['btn', statusHandler(todo.status).buttonClass, 'btn-sm']" disabled>{{ statusHandler(todo.status).title }}</button>
                <router-link :to="{ name: TodosRoutes.Todo.name, params: { todo_id: todo._id } }">
                    <button class="btn btn-primary btn-sm">Edit</button>
                </router-link>
            </div>
        </b-list-group-item>
    </b-list-group>
</template>

<script>
    import { TodosRoutes } from '@/constants/routes/TodosRoutes';

    export default {
        data() {
            return {
                TodosRoutes: TodosRoutes
            }
        }, 
        props: {
            todos: { type: Array, default: () => [] }
        },
        methods: {
            statusHandler(status) {
                switch(status) {
                    case 'todo':
                        return {
                            title: 'Todo',
                            buttonClass: 'btn-secondary'
                        }
                    case 'done':
                        return {
                            title: 'Done',
                            buttonClass: 'btn-success'
                        }
                }
            }
        }
    }
</script>

<style>

</style>