const express = require('express')
const app = require("liquid-express-views")(express())
const port = 3000;
const pokemon = require('./pokedex/pokemon.js')

app.get('/', (req, res) => {
    res.send(`You're now on the Index.`)
})

app.listen(port, () => {
    console.log("Now listening on port 3000 :)")
})