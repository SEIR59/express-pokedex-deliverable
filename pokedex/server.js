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

app.get('/pokemon/new', (req, res) => {
    res.render('new.liquid')
})

app.post('/pokemon', (req, res) => {
    Pokemon.push(req.body)
    res.redirect('/pokemon')
})

app.get('/pokemon/', (req, res) => {
    res.render(
        'index.liquid', {
            allPokemon: Pokemon
        }
    )
})

app.get('/pokemon/:index', (req, res) => {
    res.render(
        'show.liquid', {
            pokemon: Pokemon[req.params.index]
        }
    )
})

app.listen(3000, () => {
    console.log("listening on port 3000!")
    routesReport.print()
})