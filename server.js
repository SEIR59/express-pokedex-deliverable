const express = require('express')
const app = require('liquid-express-views')(express())
const PokemonList = require('./models/pokemon.js')

let port = 3000
app.listen(port, () => {
    console.log("Listining on port: ", port)
}) 