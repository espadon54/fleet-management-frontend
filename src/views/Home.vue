<template>
  <div class="home">
    <b-breadcrumb :items="breadcrumb"></b-breadcrumb>
    <div>
      <div v-if="cars && cars.length===0">
        <img id="no-car-image" alt="No cars Image" src="../assets/no-cars.png">
        <h2> No vehicle in the fleet, please add one vehicle!</h2>
      </div>
      <b-table
        striped
        hover
        responsive
        @row-clicked="onNavigate"
        v-if="cars && cars.length>0"
        :items="cars"
        :fields="fields">
          <template v-slot:cell(details)="data">
            <b-button @click="onNavigate(data.item)" type="submit" variant="info">Details</b-button>
         </template>
      </b-table>
      <b-modal id="add-car" title="Add a car">
        <p class="my-4">Please enter car information</p>
        <div>
          <b-form @submit="onSubmit">
            <b-form-group
              id="input-group-1"
              label-for="car-name"
            >
              <b-form-input
                id="car-name"
                v-model="form.name"
                type="text"
                required
                placeholder="Enter the car name"
              ></b-form-input>
            </b-form-group>
            <b-form-group
              id="input-group-2"
              label-for="car-vin"
            >
              <b-form-input
                id="car-vin"
                v-model="form.vin"
                type="text"
                required
                placeholder="Enter the VIN"
              ></b-form-input>
            </b-form-group>
            <b-form-group
              id="input-group-4"
              label-for="car-make"
            >
              <b-form-select
                id="car-make"
                v-model="form.make"
                :options="makes"
                required
              ></b-form-select>
            </b-form-group>
            <b-form-group
              id="input-group-5"
              label-for="car-model"
            >
              <b-form-select
                id="car-model"
                v-model="form.model"
                :options="models"
                required
              ></b-form-select>
            </b-form-group>
            <b-form-group
              id="input-group-6"
              label-for="car-tyoe"
            >
              <b-form-select
                id="car-type"
                v-model="form.type"
                :options="types"
                required
              ></b-form-select>
            </b-form-group>
            <b-form-group
              id="input-group-7"
              label-for="car-fuelType"
            >
              <b-form-select
                id="car-fuelType"
                v-model="form.fuelType"
                :options="fuelTypes"
                required
              ></b-form-select>
            </b-form-group>
            <b-form-group
              id="input-group-8"
              label-for="car-year"
            >
              <b-form-input
                id="car-year"
                v-model="form.year"
                type="number"
                required
                placeholder="Enter the car year"
              ></b-form-input>
            </b-form-group>
            <b-button type="submit" variant="primary">Submit</b-button>
          </b-form>
        </div>
        <template v-slot:modal-footer="{ cancel }">
          <b-button size="sm" variant="danger" @click="cancel()">
            Cancel
          </b-button>
        </template>
      </b-modal>
      <b-button v-b-modal.add-car size="lg" variant="primary">Add a car</b-button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: mapState({
    count: (state) => state.cars.count,
    cars: (state) => state.cars.all,
  }),
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      this.$store.dispatch('cars/addCar', this.form);
      this.$bvModal.hide('add-car');
    },
    onNavigate(item) {
      this.$router.push({ path: `car/${item.id}` });
    },
  },
  created() {
    this.$store.dispatch('cars/getAllCars');
  },
  data() {
    return {
      breadcrumb: [
        {
          text: 'MY FLEET',
          to: { name: 'Home' },
        },
      ],
      form: {
        name: '',
        vin: '',
        year: '',
        model: null,
        make: null,
        fuelType: null,
        type: null,
      },
      models: [{ text: 'Select Model', value: null }, 'MODEL S', 'MODEL E', 'XHS'],
      makes: [{ text: 'Select Make', value: null }, 'BMW', 'PORSCHE', 'TESLA'],
      fuelTypes: [{ text: 'Select Fuel Type', value: null }, 'PETROL', 'GAZ', 'HYDROGEN'],
      types: [{ text: 'Select Type', value: null }, 'SUV', 'COUPE'],
      fields: [
        'id',
        'name',
        'make',
        'model',
        'year',
        'type',
        'fuelType',
        'details',
      ],
    };
  },
};
</script>
