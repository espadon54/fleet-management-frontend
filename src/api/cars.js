const BASE_URI = 'https://ihfn377ec3.execute-api.us-east-1.amazonaws.com/Prod';

function post(URI, opts, cb) {
  fetch(URI, {
    method: 'POST',
    body: JSON.stringify(opts),
  })
    .then(
      (response) => {
        if (response.status !== 201 && response.status !== 200) {
          console.log(`Looks like there was a problem. Status Code: ${response.status}`);
          cb(response, null);
          return;
        }
        response.json().then((data) => {
          cb(null, data);
        });
      },
    )
    .catch((err) => {
      console.log('Fetch Error :-S', err);
      cb(err, null);
    });
}

function get(URI, cb) {
  fetch(URI, {
    method: 'GET',
  })
    .then(
      (response) => {
        if (response.status !== 200) {
          console.log(`Looks like there was a problem. Status Code: ${response.status}`);
          cb(response, null);
          return;
        }
        response.json().then((data) => {
          cb(null, data);
        });
      },
    )
    .catch((err) => {
      console.log('Fetch Error :-S', err);
      cb(err, null);
    });
}

export default {
  getAllCars(cb) {
    get(`${BASE_URI}/getAll`, (err, res) => {
      if (err) {
        cb(err, null);
        return;
      }
      cb(null, res.result.Items);
    });
  },
  removeCar(carId, cb) {
    post(`${BASE_URI}/deleteCar`, { id: carId }, (err, res) => {
      if (err) {
        cb(err, null);
        return;
      }
      cb(null, res.carId);
    });
  },
  getCar(carId, cb) {
    get(`${BASE_URI}/getCar?id=${carId}`, (err, res) => {
      if (err) {
        cb(err, null);
        return;
      }
      cb(null, res.result.Item);
    });
  },
  addCar(car, cb) {
    const newCar = {
      ...car, Position: { lon: 0, lat: 0 }, odometer: 0, fuel: 0, battery: 0,
    };
    post(`${BASE_URI}/createCar`, newCar, (err, res) => {
      if (err) {
        cb(err, null);
        return;
      }
      cb(null, { ...car, id: res.carId });
    });
  },
};
