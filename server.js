const express = require('express')
const app = require('liquid-express-views')(express())
const PokemonList = require('./models/pokedex/pokemon.js')
const pokemon = require('./models/pokedex/pokemon.js')

let port = 3000
app.listen(port, () => {
    console.log("Listining on port: ", port)
}) 


app.get('/', (req, res) => {
    res.render(
        'index',
        {
            PokemonList: PokemonList
        }
    )
}) 

app.get('/:id', (req, res) => {
    res.render('pokemon', {
        pokemon: PokemonList[req.params.id]
    })
})

app.get('/add', (req, res) => {
    res.render('add')
})