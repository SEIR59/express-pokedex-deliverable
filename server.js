const express    = require('express');
const app        = require('liquid-express-views')(express())
const port = 3000
const pokemon = require('./pokedex/pokemon');


// INDEX
app.get('/', (req, res) => {

    res.render('index', { data: pokemon });
});

 
// SHOW
app.get('/:id', (req, res) => {
res.render('show', { data: pokemon[req.params.id] });
});

app.listen(port, (req, res) => {
    console.log('We are live from 3000, the pokemon center')
})