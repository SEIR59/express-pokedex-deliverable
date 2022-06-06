const express = require('express');
const app = express();
const Pokemon = require('./models/pokedex/pokemon.js');
console.log(Pokemon)


// INDEX
app.get('/', (req, res) => {
    res.render('index.liquid', { data: Pokemon });
});


// SHOW
app.get('/:id', (req, res) => {
    res.render('show.liquid', { data: Pokemon[req.params.id] });
});

//new