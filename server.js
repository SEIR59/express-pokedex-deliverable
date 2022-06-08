const express = require('express')
const app = require('liquid-express-views')(express())
const Pokemon = require('./pokedex/models/pokemon.js')
const port = 3000
const methodOverride = require("method-override");

// MIDDLEWARE
app.use((req, res, next) => {
    console.log('I run for all routes')
    next()
})
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride("_method"));

// Index
app.get('/pokemon', (req, res) => {
    res.render('index', { data: Pokemon })
})

// New
app.get('/pokemon/new', (req, res) => {
    res.render('new', { data: Pokemon[req.params.id] })
})

// Show
app.get('/pokemon/:id', (req, res) => {
    res.render('show', {
        data: Pokemon[req.params.id],
        index: req.params.id
    })
})

// Edit
app.get('/pokemon/:id/edit', (req, res) => {
    res.render('edit', {
        data: Pokemon[req.params.id],
        index: req.params.id
    })
})

// Create
app.post('/pokemon', (req, res) => {
    let typeArray = [req.body.type1]
    if (req.body.type2) {
        typeArray.push(req.body.type2)
    }
    let currentMon = {
        name: req.body.name,
        type: typeArray,
        stats: {
            hp: req.body.hp,
            attack: req.body.attack,
            defense: req.body.defense
        },
        img: "https://i.ytimg.com/vi/gLkNlyU0qd4/mqdefault.jpg"
    }
    console.log(currentMon)
    Pokemon.push(currentMon)
    res.redirect('pokemon')
})

// Update
app.put('/pokemon/:id', (req, res) => {
    Pokemon[req.params.id].name = req.body.name
    Pokemon[req.params.id].type[0] = req.body.type1
    Pokemon[req.params.id].type[1] = req.body.type2
    Pokemon[req.params.id].stats.hp = req.body.hp
    Pokemon[req.params.id].stats.attack = req.body.attack
    Pokemon[req.params.id].stats.defense = req.body.defense
    res.redirect('/pokemon')
})

// Destroy
app.delete('/pokemon/:id', (req, res) => {
    res.render('show', { data: Pokemon[req.params.id] })
})



// LISTEN
app.listen(port, () => {
    console.log('listening on port: ' + port)
})