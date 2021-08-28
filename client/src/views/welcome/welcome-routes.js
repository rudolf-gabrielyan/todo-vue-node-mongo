import { WelcomeRoutes } from '@/constants/routes/WelcomeRoutes';

const routes = [
    {
        ...WelcomeRoutes.Welcome,
        component: () => import('./Welcome'),   
    }
];

export default routes;