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
app.get('/pokemon', (req, res) => {
    res.render('index', { 
        allPokemon: Pokemon 
    })
})

// SHOW
app.get('/pokemon/:id', (req, res) => {
    res.render('show', { 
        Pokemon: Pokemon[req.params.id],
        index: req.params.id
    })
})

// NEW
app.get('/pokemon/new', (req, res) => {
    res.render('new', {

    })
})

// UPDATE
app.put('/pokemon/:id', (req, res) => {
    Pokemon[req.params.id] = req.body
    res.redirect('/pokemon')
})

// DELETE
app.delete('/pokemon/:id', (req, res) => {
    Pokemon.splice(req.params.id, 1)
    res.redirect('/pokemon')
})


// LISTEN
app.listen(port, () => {
    console.log('Listening on port 3000')
})