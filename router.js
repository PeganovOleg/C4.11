import Vue from 'vue';
import Router from 'vue-router';
import Fetch from './components/Todos.vue'; 

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/Todos', 
      name: 'todos',
      component: Fetch,
    }
  ],
});