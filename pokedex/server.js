const express = require('express')
const app = require("liquid-express-views")(express())
const Pokemon = require('./models/pokemon.js')
const methodOverride = require('method-override')
const rowdy = require('rowdy-logger')

const routesReport = rowdy.begin(app)

app.use(express.urlencoded({
    extended: false
}))

app.use(express.static('public'))

app.use(express.json())

app.use(methodOverride("_method"))

app.get('/', (req, res) => {
    res.send('Hello')
})

app.get('/pokemon/', (req, res) => {
    res.render(
        'index.liquid', {
            allPokemon: Pokemon
        }
    )
})

app.get('/pokemon/new', (req, res) => {
    res.render('new.liquid')
})

app.get('/pokemon/:index', (req, res) => {
    res.render(
        'show.liquid', {
            pokemon: Pokemon[req.params.index]
        }
    )
})

app.post('/pokemon', (req, res) => {
    Pokemon.push(req.body)
    res.redirect('/pokemon')
})

app.get('/pokemon/:index/edit', (req, res) => {
    res.render(
        'edit.liquid', {
            pokemon: Pokemon[req.params.index],
            index: req.params.index
        }
    )
})

app.put('/pokemon/:index', (req, res) => {
    Pokemon[req.params.index].name = req.body.name
    Pokemon[req.params.index].type = req.body.type.split(" ")
    Pokemon[req.params.index].stats.hp = req.body.hp
    Pokemon[req.params.index].stats.attack = req.body.attack
    Pokemon[req.params.index].stats.defense = req.body.defense
    res.redirect('/pokemon')
})

app.delete('/pokemon/:index', (req, res) => {
    Pokemon.splice(req.params.index, 1)
    res.redirect('/pokemon')
})

app.listen(3000, () => {
    console.log("listening on port 3000!")
    routesReport.print()
})