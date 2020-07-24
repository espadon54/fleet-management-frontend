import uid from 'uid';

let cars = [
  {
    id: 11,
    name: 'Executive car 2',
    vin: 'ASD423E3D3RF5',
    make: 'Mazda',
    model: 'CX-5',
    year: '2019',
    fuelType: 'petrol',
    type: 'SUV',
    Position: {
      lat: 3.995,
      lon: 43.2221,
    },
    odometer: 43546,
    fuel: 33.4,
    battery: 12.7,
  },
  {
    id: 22,
    name: 'Executive car 1',
    vin: 'ASD423E3D3RF5',
    make: 'Mazda',
    model: 'CX-5',
    year: '2019',
    fuelType: 'petrol',
    type: 'SUV',
    Position: {
      lat: 3.995,
      lon: 43.2221,
    },
    odometer: 43546,
    fuel: 33.4,
    battery: 12.7,
  },
  {
    id: 33,
    name: 'Executive car 2',
    vin: 'ASD423E3D3RF5',
    make: 'Mazda',
    model: 'CX-5',
    year: '2019',
    fuelType: 'petrol',
    type: 'SUV',
    Position: {
      lat: 3.995,
      lon: 43.2221,
    },
    odometer: 43546,
    fuel: 33.4,
    battery: 12.7,
  },
  {
    id: 44,
    name: 'Executive car 1',
    vin: 'ASD423E3D3RF5',
    make: 'Mazda',
    model: 'CX-5',
    year: '2019',
    fuelType: 'petrol',
    type: 'SUV',
    Position: {
      lat: 3.995,
      lon: 43.2221,
    },
    odometer: 43546,
    fuel: 33.4,
    battery: 12.7,
  },
  {
    id: 55,
    name: 'Executive car 1',
    vin: 'ASD423E3D3RF5',
    make: 'Mazda',
    model: 'CX-5',
    year: '2019',
    fuelType: 'petrol',
    type: 'SUV',
    Position: {
      lat: 3.995,
      lon: 43.2221,
    },
    odometer: 43546,
    fuel: 33.4,
    battery: 12.7,
  },
];

export default {
  getAllCars(cb) {
    cb(cars);
  },
  removeCar(carId, cb) {
    cars = cars.filter((car) => String(carId) !== String(car.id));
    cb();
  },
  getCar(carId, cb) {
    const car = cars.find((c) => String(carId) === String(c.id));
    cb(car);
  },
  addCar(car, cb) {
    const dbCar = {
      ...car,
      id: uid(),
      Position: { lon: 0, lat: 0 },
      fuel: 0,
      battery: 0,
      odometer: 0,
    };
    cb(dbCar);
  },
};
