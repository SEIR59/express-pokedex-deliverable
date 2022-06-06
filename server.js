const express = require('express')
const app = require('liquid-express-views')(express())
const Pokemon = require('./models/pokedex/pokemon.js')
const port = 3000

app.use(express.urlencoded({extended: false}))

app.use(express.static('public'))

app.post('/pokemon', (req, res) => {
    Pokemon.push(req.body)
    res.redirect('/')
})

app.get('/pokemon', (req, res) => {
    res.render('index', {
        allPokemon: Pokemon,
    })
})

app.get('/pokemon/new', (req, res) => {
    res.render('new')
})

app.get('/pokemon/:id', (req, res) => {
    res.render('show', { 
        thisPokemon: Pokemon[req.params.id] 
    })
})


app.listen(port, () => {
    console.log(`Listening to port: ${port}`)
})