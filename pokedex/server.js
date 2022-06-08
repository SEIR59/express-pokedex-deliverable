const express = require('express');
const methodOverride = require('method-override')
const pokemon = require('./pokemon');
const app = require("liquid-express-views")(express());

const port = 3000;

//Middleware
app.use(methodOverride('_method'))

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
    pokemon.push(req.body);
    res.redirect("/pokemon")
});

app.get('/pokemon/:id', (req, res) =>{
    res.render('show', {
    })
});

app.post('/pokemon/:id', (req, res) =>{
    res.render('show', {
        thePokemon: pokemon[req.params.id]
    })
});

app.get('/pokemon/new', (req, res) =>{
    res.render('new')
});


app.get('/pokemon/:id', (req, res) =>{
    res.render('show', {
        thePokemon: pokemon[req.params.id]
    })
});

app.post('/pokemon/:id', (req, res) =>{
    res.render('edit', {
        thePokemon: pokemon[req.params.id]
    })
});


app.get('/pokemon/:id/edit', (req, res) =>{
    res.render('edit', {
        thePokemon: pokemon[req.params.id]
    })
});

app.post('/pokemon/:id/edit', (req, res) => {
    pokemon[req.params.id]
    res.redirect('/pokemon')
})

app.listen(port, () => {
    console.log('listening');
});