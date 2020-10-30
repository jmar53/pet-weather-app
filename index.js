require('dotenv').config();
const express = require('express');
const app = express();
const request = require('request');
const bodyParser = require('body-parser');
const port = process.env.PORT || 4000;
const petApiLink = process.env.PET_API;
console.log(petApiLink);
const awKey = process.env.AW_API_KEY;
const awCitySearch = 'http://dataservice.accuweather.com/locations/v1/cities/search';
const awCurrentConditions = 'http://dataservice.accuweather.com/currentconditions/v1/';

app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  request.get(petApiLink, (error, response, body) => {
    if (error) {
      return console.dir(error);
    }
    const pets = JSON.parse(body);
    res.render('index', { pets: pets });
  });
});

app.get('/pets/:id', (req, res) => {
  const selectedId = req.params.id;
  request.get(petApiLink + '/' + selectedId, (error, response, body) => {
    if (error) {
      return console.dir(error);
    }
    let pet = JSON.parse(body)[0];
    let location = 'default';
    const awCityOptions = {
      url: `${awCitySearch}?apikey=${awKey}&q=${pet.location}`,
      gzip: true
    };
    request.get(awCityOptions, (error, response, body) => {
      if (error) {
        return console.dir(error);
      }
      if (!JSON.parse(body)[0]) {
        res.render('error', {err: JSON.parse(body)});
      } else {
        location = JSON.parse(body)[0].Key;
        const awConditionsOptions = {
          url: `${awCurrentConditions}${location}?apikey=${awKey}`,
          gzip: true
        };
        request.get(awConditionsOptions, (error, response, body) => {
          if (error) {
            return console.dir(error);
          }
          res.render('pet', { pet: pet, location: location, cc: JSON.parse(body)[0] });
        });
      }
    });
  });
});

app.get('/new', (req, res) => {
  res.render('new', {});
});

app.post('/new', (req, res) => {
  const pet = req.body;
  request.post({
    "headers": { "content-type": "application/json" },
    "url": petApiLink,
    "body": JSON.stringify({
      "name": pet.name,
      "pet_type": pet.pet_type,
      "breed": pet.breed,
      "location": pet.location,
      "latitude": pet.latitude,
      "longitude": pet.longitude
    })
  }, (error, response, body) => {
    if (error) {
      return console.dir(error);
    }
    res.redirect('/');
  });
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});