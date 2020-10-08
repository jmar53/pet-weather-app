const express = require('express');
const app = express();
const request = require('request');
const port = 4000;
const petApiLink = 'http://localhost:3000/pets';

app.set('view engine', 'pug');

app.get('/', (req, res) => {
  request.get(petApiLink, (error, response, body) => {
    if(error) {
        return console.dir(error);
    }
    const pets = JSON.parse(body);
    res.render('index', {pets: pets});
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});