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

// create route
// creating a new pokemon
app.post('/create', (request, response) => {
    let pokemon = {}
    pokemon.id = request.body.id
    pokemon.name = request.body.name
    pokemon.img = request.body.img
    pokemon.type = request.body.type.split(", ")
    pokemon.stats = {
        hp: request.body.statshp, 
        attack: request.body.statsattack, 
        defense: request.body.statsdefense,
    }
    PokemonList.push(pokemon)
    response.redirect('/')
})

// new route
// directing to a page to make the new pokemon
app.get('/new', (request, response) => {
    response.render('new', {
        lastIndex: PokemonList.length
    })
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

