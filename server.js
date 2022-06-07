// pulling dependencies
const express = require('express')
const app = require('liquid-express-views')(express())
const PokemonList = require('./models/pokemon.js')
const methodOverride = require("method-override");
const pokemon = require('./models/pokemon.js');

// indicating which port is being used
let port = 3000
app.listen(port, () => {
    console.log("Using port: ", port)
})

// setting up middleware
app.use(express.urlencoded({extended:false})); // to view request.body
app.use(express.static('public')); // to use css
app.use(methodOverride("_method")); // to use delete and update method

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
        speed: request.body.statsspeed
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
        pokemon: PokemonList[request.params.id],
    })
})

// delete route
// deleting a pokemon from the pokedex
app.delete('/:id', (request, response) => {
    PokemonList.splice(request.params.id, 1)
    response.redirect('/')
})

// edit route
// editting information on selected pokemon
app.get('/:id/edit', (request, response) => {
    response.render('edit', 
    {
        index: request.params.id,
        pokemon: PokemonList[request.params.id]
    })
})

// update route
app.put('/:id/update', (request, response) => {
    PokemonList[request.params.id].name = request.body.name
    PokemonList[request.params.id].img = request.body.img
    PokemonList[request.params.id].type = request.body.type
    PokemonList[request.params.id].stats.hp = request.body.statshp
    PokemonList[request.params.id].stats.attack = request.body.statsattack
    PokemonList[request.params.id].stats.defense = request.body.statsdefense
    PokemonList[request.params.id].stats.speed = request.body.statsspeed
    response.redirect('/')
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

