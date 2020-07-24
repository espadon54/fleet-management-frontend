import Vue from 'vue';
import Vuex from 'vuex';
import cars from './modules/cars';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    cars,
  },
});

export default store;
