import Vue from 'vue';
import VueRouter from 'vue-router';
import '@/assets/css/tailwind.css';

import App from './App.vue';
import CreateCategory from './components/CreateCategory';
import CreatePost from './components/CreatePost';

window.axios = require('axios');
window.Swal = require('sweetalert2');

Vue.use(VueRouter);
Vue.config.productionTip = false;

const routes = [
  {path: '/', component: CreatePost},
  {path: '/category', component: CreateCategory},
];

const router = new VueRouter({routes});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');




