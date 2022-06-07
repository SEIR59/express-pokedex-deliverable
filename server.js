const express    = require('express');
const app = require('liquid-express-views')(express());
const Pokemon = require('./models/pokemon.js');
const methodOverride = require('method-override')
const rowdy = require('rowdy-logger')
const routeReport = rowdy.begin(app)
const port = 3000

// INDEX
app.get('/', (req, res) => {
res.render('index.liquid', { data: Pokemon });
});

// SHOW
app.get('/:id', (req, res) => {
res.render('show.liquid', { data: Pokemon[req.params.id] });
});