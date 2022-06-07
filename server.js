const express = require('express')
const app = require('liquid-express-views')(express())
const Pokemon = require('./pokedex/models/pokemon.js')
const port = 3000

// MIDDLEWARE
app.use((req, res, next) => {
    console.log('I run for all routes')
    next()
})

app.use(express.urlencoded({ extended: false}))

// Index
app.get('/pokemon', (req, res) => {
    res.render('index', { data: Pokemon })
})

// New
app.get('/pokemon/new', (req, res) => {
    res.render('show', { data: Pokemon[req.params.id] })
})

// Show
app.get('/pokemon/:id', (req, res) => {
    res.render('show', { data: Pokemon[req.params.id] })
})

// Edit
app.get('pokemon/:id/edit', (req, res) => {
    res.render('show', { data: Pokemon[req.params.id] })
})

// Create
app.post('/pokemon', (req, res) => {
    res.render('show', { data: Pokemon[req.params.id] })
})

// Update
app.put('/pokemon/:id', (req, res) => {
    res.render('show', { data: Pokemon[req.params.id] })
})

// Destroy
app.delete('/pokemon/:id', (req, res) => {
    res.render('show', { data: Pokemon[req.params.id] })
})



// LISTEN
app.listen(port, () => {
    console.log('listening on port: ' + port)
})