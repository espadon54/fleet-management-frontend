import Vue from 'vue';
import cars from '../../api/cars';
import router from '../../router';

const displayNotification = (type, message) => {
  Vue.$toast.open({
    message,
    type,
    position: 'top-right',
    duration: 1000,
    queue: true,
  });
};

// initial state
const state = () => ({
  all: null,
  current: null,
});

// getters
const getters = {
  getCarsNumber(state) {
    return state.all.length;
  },
};

// actions
const actions = {
  getAllCars({ commit }) {
    cars.getAllCars((err, cars) => {
      if (err) {
        displayNotification('error', 'Something went wrong.');
        return;
      }
      commit('setCars', cars);
    });
  },
  getCar({ commit }, carId) {
    cars.getCar(carId, (err, car) => {
      if (err) {
        displayNotification('error', 'Something went wrong.');
        return;
      }
      commit('setCar', car);
    });
  },
  removeCar({ commit }, carId) {
    displayNotification('info', `Car ${carId} deletion in progress.`);
    cars.removeCar(carId, (err, carId) => {
      if (err) {
        displayNotification('error', 'Something went wrong.');
        return;
      }
      displayNotification('success', `Car ${carId} successfully deleted.`);
      commit('removeCar', carId);
      router.push({ path: '/' });
    });
  },
  addCar({ commit }, car) {
    displayNotification('info', 'Car creation in progress.');
    cars.addCar(car, (err, dbCar) => {
      if (err) {
        displayNotification('error', 'Something went wrong.');
        return;
      }
      displayNotification('success', 'Car successfully added.');
      commit('addCar', dbCar);
    });
  },
};

// mutations
const mutations = {
  setCars(state, cars) {
    state.all = cars;
  },
  setCar(state, car) {
    state.current = car;
  },
  removeCar(state, carId) {
    state.all = state.all.filter((car) => parseInt(carId, 10) !== parseInt(car.id, 10));
  },
  addCar(state, car) {
    state.all.push(car);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
