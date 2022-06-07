const express = require('express')
const app = require('liquid-express-views')(express())
const Pokemon = require('./models/pokedex/pokemon.js')
const methodOverride = require('method-override')
const port = 3000

app.use(express.urlencoded({extended: false}))

app.use(express.static('public'))

app.use(methodOverride('_method'))

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
        thisPokemon: Pokemon[req.params.id],
        index: req.params.id
    })
})

app.get('/pokemon/:id/edit', (req, res) => {
    res.render('edit', {
        thisPokemon: Pokemon[req.params.id],
        index: req.params.id
    })
})

app.put('/pokemon/:id', (req,res) => {
    let thisPokemon = Pokemon[req.params.id]
    const {name, id, height, weight, type} = req.body
    thisPokemon.name = req.body.name
    thisPokemon.id = req.body.id
    thisPokemon.misc.height = req.body.height
    thisPokemon.misc.weight = req.body.weight
    thisPokemon.type = req.body.type
    res.redirect('/pokemon')
})

app.delete('/pokemon/:id', (req, res) => {
    Pokemon.splice(req.params.id, 1)
    res.redirect('/pokemon')
})


app.listen(port, () => {
    console.log(`Listening to port: ${port}`)
})