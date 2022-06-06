// pulling dependencies
const express = require('express')
const app = require('liquid-express-views')(express())
const PokemonList = require('./models/pokemon.js')

// indicating which port is being used
let port = 3000
app.listen(port, () => {
    console.log("Using port: ", port)
})