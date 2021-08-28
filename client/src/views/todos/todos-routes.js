import { TodosRoutes } from '@/constants/routes/TodosRoutes';

const routes = [
    {
        ...TodosRoutes.Todos,
        component: () => import('./Todos'),
        meta: {
            layout: 'todo-layout'
        }
    },
    {
        ...TodosRoutes.Todo,
        component: () => import('./Todo'),
        meta: {
            layout: 'todo-layout'
        }
    },
];

export default routes;