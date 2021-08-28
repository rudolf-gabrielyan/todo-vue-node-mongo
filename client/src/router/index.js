import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router)

//routes
import WelcomeRoutes from '../views/welcome/welcome-routes';
import TodosRoutes from '../views/todos/todos-routes';

export default new Router({
  mode: 'history',
  routes: [
    ...WelcomeRoutes,
    ...TodosRoutes
    //todo put all routes here
  ]
})
