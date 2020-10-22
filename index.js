const express = require('express');
const app = express();
const request = require('request');
const bodyParser = require('body-parser');
const port = 4000;
const petApiLink = 'http://localhost:3000/pets';

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
    res.render('pet-y', { pet: JSON.parse(body)[0] });
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