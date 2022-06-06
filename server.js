// pulling dependencies
const express = require('express')
const app = require('liquid-express-views')(express())
const PokemonList = require('./models/pokemon.js')

// indicating which port is being used
let port = 3000
app.listen(port, () => {
    console.log("Using port: ", port)
})

// setting up middleware
app.use(express.urlencoded({extended:false})); // to view request.body
app.use(express.static('public')); // to use css

// new route
// directing to a page to make the new pokemon
app.get('/new', (request, response) => {
    response.render('new')
})

// show route
// viewing more details about the pokemon
app.get('/:id', (request, response) => {
    response.render('pokemon', {
        pokemon: PokemonList[request.params.id]
    })
})

// index route
// showing the list of all the pokemon in the pokedex
app.get('/', (request, response) => {
    response.render(
        'index',
        {
            PokemonList: PokemonList
        }
    )
})

