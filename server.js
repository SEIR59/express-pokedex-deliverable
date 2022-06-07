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

// INDEX
app.get('/', (req, res) => {
    res.render('index', { data: Pokemon })
})


// SHOW
app.get('/:id', (req, res) => {
    res.render('show', { data: Pokemon[req.params.id] })
})







// LISTEN
app.listen(port, () => {
    console.log('listening on port: ' + port)
})