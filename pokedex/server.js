const express = require('express');
const methodOverride = require('method-override')
const Pokemon = require('./pokemon');
const app = require("liquid-express-views")(express());

const port = 3000;

//Middleware
app.use(methodOverride('_method'))
app.use(express.urlencoded({extended:true}));

app.use((req, res, next) => {
    console.log('I run for all routes');
    next();
});

app.get('/', (req, res) =>{
    res.render('index', {
        allPokemon: Pokemon
    })
});

app.post('/', (req, res) =>{
    Pokemon.push(req.body);
    res.redirect("/")
});

app.get('/new', (req, res) =>{
    res.render('new')
});

app.get('/:id', (req, res) =>{
    res.render('show', {
        thePokemon: Pokemon[req.params.id],
        id: req.params.id
    })
});

app.post('/:id', (req, res) =>{
    res.render('show', {
        
    })
});

app.get('/:id/edit', (req, res) =>{
    res.render('edit', {
        thePokemon: Pokemon[req.params.id],
        id: req.params.id
    })
});

app.put('/:id', (req, res) => {
    let thePokemon = Pokemon[req.params.id]
    thePokemon.name = req.body.name
    thePokemon.name = req.body.type
    thePokemon.name = req.body.id
    thePokemon.name = req.body.hp
    thePokemon.name = req.body.attack
    thePokemon.name = req.body.defense
    res.redirect('/')
})

app.delete('/:id', (req, res) =>{
    Pokemon.splice(req.params.id, 1)
    res.redirect('/')
})

app.listen(port, () => {
    console.log('listening');
});