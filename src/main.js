import Vue from 'vue'
import VueFire from 'vuefire'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import firebase from 'firebase'

import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
// import Timestamp from 'time-stamp'

Vue.use(VueFire)
Vue.use(Vuetify, {
  iconfont: 'md'
})

// Vue.use(Timestamp)



Vue.config.productionTip = false

let app = '';

// Initialize Firebase
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCuZHj48xFd1wRCnQNce2zhBiMcfdaMj1o",
  authDomain: "nextgen-scout.firebaseapp.com",
  databaseURL: "https://nextgen-scout.firebaseio.com",
  projectId: "nextgen-scout",
  storageBucket: "nextgen-scout.appspot.com",
  messagingSenderId: "731648902565"
});

firebase.auth().onAuthStateChanged(() => {
  if(!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
});


//filters


// Vue.filter('filterPlayingExperience', function(value){
//   return value.toUpperCase();
// });
// Vue.filter('filterCounty', function(value){
//   return value.toUpperCase();
// });
// Vue.filter('filterPositions', function(value){
//   return value.toUpperCase();
// });
// Vue.filter('filterTraits', function(value){
//   return value.toUpperCase();
// });
// Vue.filter('filterPreferredFoot', function(value){
//   return value.toUpperCase();
// });

export const database = firebaseApp.database();
// export const players = database.ref('/Players');
