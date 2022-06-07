const express = require('express');
const pokemon = require('./pokemon');
const app = require("liquid-express-views")(express());
const Pokemon = require('./pokemon');

const port = 3000;

app.use((req, res, next) => {
    console.log('I run for all routes');
    next();
});

app.use(express.urlencoded({extended:false}));


app.get('/pokemon', (req, res) =>{
    res.render('index', {
        allPokemon: pokemon
    })
});

app.get('/pokemon/:id', (req, res) =>{
    res.render('show')
});

app.get('/pokemon/new', (req, res) =>{
    res.render('new')
});


app.listen(port, () => {
    console.log('listening');
});