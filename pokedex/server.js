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

app.post('/pokemon', (req, res) =>{
    Pokemon.push(req.body);
    res.redirect("/pokemon")
});

app.put('/pokemon/:id', (req, res) =>{
    res.render('show', {
        thePokemon: Pokemon[req.params.id]
    })
});

app.get('/pokemon/new', (req, res) =>{
    res.render('new')
});


app.get('/pokemon/:id', (req, res) =>{
    res.render('show', {
        thePokemon: Pokemon[req.params.id]
    })
});

app.get('/pokemon/:id/edit', (req, res) =>{
    res.render('edit', {
        thePokemon: Pokemon[req.params.id]
    })
});

app.put('/pokemon/:id', (req, res) =>{
    res.render('edit', {
        thePokemon: Pokemon[req.params.id]
    })
});


app.listen(port, () => {
    console.log('listening');
});