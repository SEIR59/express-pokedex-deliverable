const express = require('express');
const Pokemon = require('./models/pokemon.js')
const app = require("liquid-express-views")(express())

// INDEX
app.get('/', (req, res) => {
    res.render('index.liquid', { data: Pokemon });
    });
    
    
    // SHOW
    app.get('/:id', (req, res) => {
    res.render('show.liquid', { data: Pokemon[req.params.id] });
    });
    
    