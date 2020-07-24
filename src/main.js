import Vue from 'vue';
import VueToast from 'vue-toast-notification';
// Import one of available themes
import 'vue-toast-notification/dist/theme-default.css';
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import VueMapbox from 'vue-mapbox';
import Mapbox from 'mapbox-gl';
import App from './views/App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(VueToast);
Vue.use(VueMapbox, { mapboxgl: Mapbox });

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
