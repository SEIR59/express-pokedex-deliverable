const express  = require('express');
const app  = require("liquid-express-views")(express())
const Pokemon = require('../pokedex/models/pokemon.js');


// INDEX
app.get('/', (req, res) => {
res.render('index.liquid', { data: Pokemon });
});


// SHOW
app.get('/:id', (req, res) => {
res.render('show.liquid', { data: Pokemon[req.params.id] });
});


app.listen(3000, () => {
  console.log("I hear you")
});