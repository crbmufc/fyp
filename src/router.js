import firebase from 'firebase'
import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home.vue'
import Login from './views/Login.vue'
import ScoutSignUp from './views/ScoutSignUp.vue'
import PlayerSignUp from './views/PlayerSignUp.vue'
import SignUp from './views/SignUp.vue'
import ScoutHome from './views/ScoutHome.vue'
import PlayerHome from './views/PlayerHome.vue'
import PlayerResults from './views/PlayerResults.vue'


Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/player-results',
      name: 'PlayerResults',
      component: PlayerResults
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/scout-sign-up',
      name: 'ScoutSignUp',
      component: ScoutSignUp
    },
    {
      path: '/player-sign-up',
      name: 'PlayerSignUp',
      component: PlayerSignUp
    },
    {
      path: '/sign-up',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/player-home',
      name: 'PlayerHome',
      component: PlayerHome,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/scout-home',
      name: 'ScoutHome',
      component: ScoutHome,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/',
      redirect: '/home'
    },
    // {
    //   path: '#',
    //   redirect: '/home'
    // },
    // {
    //   path: '*',
    //   redirect: '/home'
    // }
  ]
});

// router.beforeEach((to, from, next) => {
//   const currentUser = firebase.auth().currentUser;
//   const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

//   if (requiresAuth && !currentUser) next('login');
//   else if (!requiresAuth && currentUser) next('home');
//   else next();
// });

export default router;
