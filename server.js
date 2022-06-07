const express = require('express');
const app = require('liquid-express-views')(express())
const port = 3000
const Pokemon = require('./models/pokedex/pokemon.js')
const methodOverride = require('method-override')


// MIDDLEWARE
app.use((req, res, next) => {
    console.log('I am the middleware')
    next()
})

app.use(express.urlencoded( { extended: false }))

app.use(express.static('public'))

app.use(methodOverride('_method'))

// INDEX
app.get('/', (req, res) => {
    res.render('index', { 
        allPokemon: Pokemon 
    })
})

// SHOW
app.get('/:id', (req, res) => {
    res.render('show', { 
        Pokemon: Pokemon[req.params.id] 
    })
})

// NEW
app.get('/new', (req, res) => {
    res.render('new', {

    })
})


// LISTEN
app.listen(port, () => {
    console.log('Listening on port 3000')
})