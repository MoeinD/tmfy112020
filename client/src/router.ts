import Vue from "vue";
import Router from "vue-router";


Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/projects',
      component: () => import('./components/Projects.vue'),
      name: 'projects'
    }
    , {
      path: "/projects/:id",
      component: () => import('./components/Project.vue'),
      children: [
        {
          path: 'board',
          component: () => import('./components/Board.vue'),
          name: 'board'
        },
        {
          path: 'summary',
          component: () => import('./components/Summary.vue'),
          name: 'Summary'
        },
        {
          path: 'issues',
          component: () => import('./components/Issues.vue'),
          name: 'Issues'
        },
        {
          path: 'components',
          component: () => import('./components/Components.vue'),
          name: 'Components'
        },
        {
          path: 'backlog',
          component: () => import('./components/Backlog.vue'),
          name: 'backlog'
        },

      ]
    },
    {
      path: '/people',
      name: 'people',
      component: () => import('./components/People.vue')
    }
  ],
});
