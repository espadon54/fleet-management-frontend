<template>
  <div class="carDetails">
    <b-breadcrumb :items="breadcrumb"></b-breadcrumb>
    <div v-if="car">
       <h2> {{car.name}} </h2>
       <b-row>
        <b-col sm="12" lg="4">
          <h4>Fuel: {{car.fuel}}</h4>
        </b-col>
        <b-col sm="12" lg="4">
          <h4> Battery: {{car.battery}} </h4>
        </b-col>
        <b-col sm="12" lg="4">
          <h4>Odometer: {{car.odometer}}</h4>
        </b-col>
       </b-row>
       <b-row>
        <b-col sm="12" lg="6">
          <b-card
            :title="car.name"
            img-alt="Image"
            img-top
            id="card"
            class="mb-2"
          >
            <b-card-text>
              <b-list-group>
                <b-list-group-item><b>ID:</b> {{car.id}}</b-list-group-item>
                <b-list-group-item><b>VIN:</b> {{car.vin}}</b-list-group-item>
                <b-list-group-item><b>TYPE:</b> {{car.type}}</b-list-group-item>
                <b-list-group-item><b>MAKE:</b> {{car.make}}</b-list-group-item>
                <b-list-group-item><b>MODEL:</b> {{car.model}}</b-list-group-item>
                <b-list-group-item><b>YEAR:</b> {{car.year}}</b-list-group-item>
                <b-list-group-item><b>FUEL TYPE:</b> {{car.fuelType}}</b-list-group-item>
              </b-list-group>
            </b-card-text>
            <b-button v-b-modal.remove-car href="#" variant="danger">Remove</b-button>
          </b-card>
        </b-col>
        <b-col sm="12" lg="6">
          <MglMap
            id="map"
            :accessToken="accessToken"
            :mapStyle="mapStyle"
            @load="onMapLoaded"
          >
            <MglMarker
              v-if="car.Position"
              :coordinates="[car.Position.lon, car.Position.lat]"
              color="black"
            />
          </MglMap>
        </b-col>
      </b-row>
      <b-modal id="remove-car" :title="'Remove '+ car.name">
        <div>
          Are you sure to remove this car?
        </div>
        <template v-slot:modal-footer="{ cancel }">
          <b-button size="sm" variant="success" @click="onRemove()">
            Confirm
          </b-button>
          <b-button size="sm" variant="danger" @click="cancel()">
            Cancel
          </b-button>
        </template>
      </b-modal>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { MglMap, MglMarker } from 'vue-mapbox';

export default {
  components: {
    MglMap,
    MglMarker,
  },
  computed: mapState({
    car: (state) => state.cars.current,
  }),
  methods: {
    onRemove() {
      this.$store.dispatch('cars/removeCar', this.$route.params.id);
    },
    async onMapLoaded(event) {
      // Here we cathing 'load' map event
      const asyncActions = event.component.actions;
      const car = this.$store.state.cars.current;
      if (car.Position) {
        await asyncActions.flyTo({
          center: [car.Position.lon, car.Position.lat],
          zoom: 6,
          speed: 4,
        });
      }
    },
    onNavigate(data) {
      this.$router.push({ path: `car/${data.item.id}`, params: { car: data.item } });
    },
  },
  created() {
    this.$store.dispatch('cars/getCar', this.$route.params.id);
  },
  data() {
    return {
      breadcrumb: [
        {
          text: 'MY FLEET',
          to: { name: 'Home' },
        },
        {
          text: this.$route.params.id,
          href: `car/${this.$route.params.id}`,
        },
      ],
      accessToken: 'pk.eyJ1IjoiZXNwYWRvbjU0IiwiYSI6ImNrY3E5ZzRhZTAxZzEyc2x3NHFwdG1waXIifQ.CxmtXuNS7nJvduLJcx-FjQ',
      mapStyle: 'mapbox://styles/espadon54/ck9zh1rc00mrs1iobtlakkrzn',
    };
  },
};
</script>
