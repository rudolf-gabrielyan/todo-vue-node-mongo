<template>
    <b-row>
        <b-col cols="12">
            <b-navbar type="dark" variant="dark">
                <b-navbar-nav>
                    <b-nav-item href="#" v-for="(item, index) in navItems" :key="index">
                        <router-link :to="item.to">
                            <h3>{{ item.title }}</h3>
                        </router-link>
                    </b-nav-item>
                </b-navbar-nav>
            </b-navbar>
        </b-col>
        <b-col cols="12">
            <slot />
        </b-col>
    </b-row>
</template>

<script>
    import { WelcomeRoutes } from '@/constants/routes/WelcomeRoutes';
    import { TodosRoutes } from '@/constants/routes/TodosRoutes';

    export default {
        data() {
            return {
                navItems: [
                    {
                        title: 'Todo board',
                        to: { name: TodosRoutes.Todos.name }
                    },
                    {
                        title: 'Welcome page',
                        to: { name: WelcomeRoutes.Welcome.name }
                    },
                ]
            }
        },
    }
</script>