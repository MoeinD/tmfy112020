import Vue from "vue";
import Router from "vue-router";
import store from "./store";


Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/projects',
      component: () => import('./components/Projects.vue'),
      name: 'projects',
      meta: {
        requiresAuth: false
      }

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

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    console.log('this is the store ', store.state, store.getters);
    if (!store.state.user) {
      next({ path: '/' })
    } else {
      next() // go to wherever I'm going
    }
  } else {
    next() // does not require auth, make sure to always call next()!
  }
})

export default router;
