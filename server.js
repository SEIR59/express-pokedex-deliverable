const express = require('express');
const app = require('liquid-express-views')(express())
const PokemonList = require('./models/pokemon.js');
const methodOverride = require('method-override')

//Middleware
app.use(express.urlencoded({extended:false}));
app.use(express.static('public')); 
app.use(methodOverride('_method'))

app.post('/', (req, res) => {
    PokemonList.push(req.body)
    res.redirect('/')
})

// INDEX
app.get('/', (req, res) => {
    res.render(
        'index', {
            PokemonList: PokemonList
        })
}) 

// NEW
app.get('/new', (req, res) => {
    res.render('new')
})


// SHOW
app.get('/:id', (req, res) => {
res.render('show', { 
    pokemonItem: PokemonList[req.params.id],
    index: req.params.id
    });
});

// EDIT
app.get('/:id/edit', (req, res) => {
    res.render('edit', {
        pokemonItem: PokemonList[req.params.id],
        index: req.params.id
    })
})

// PUT
app.put('/:id', (req, res) => {
    let pokemonItem = PokemonList[req.params.id]
    const {name, classification, type} = req.body
    pokemonItem.name = req.body.name
    pokemonItem.type = req.body.type
    pokemonItem.misc.classification = req.body.classification
    res.redirect('/')
})

// DELETE
app.delete('/:id', (req, res) => {
    PokemonList.splice(req.params.id, 1)
    res.redirect('/')
})


app.listen(3000, () => {
    console.log("Listening on Port 3000")
})