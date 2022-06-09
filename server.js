const express = require('express')
const app = require('liquid-express-views')(express())
const PokemonList = require('./models/pokedex/pokemon.js')
const pokemon = require('./models/pokedex/pokemon.js')
const methodOverride = require("method-override");
//const { request } = require('express');

let port = 3000
app.listen(port, () => {
    console.log("Listining on port: ", port)
}) 

//Middleware
app.use(express.urlencoded({extended:false}));
app.use(methodOverride("_method"));
app.use(express.static('public'));



app.use((req, res, next) => {
    // console.log('I run for all routes');
    next();
});



app.post('/create', (req, res) => {

    PokemonList.push({
        id: req.body.id,
        name:  req.body.name,
        img:  req.body.img,
        type:  req.body.type.split(", "),
        stats:  {
            hp: req.body.statshp, 
            attack: req.body.statsattack, 
            defense: req.body.statsdefense,
        }

    })
    res.redirect('/')
})

app.get('/add', (req, res) => {
    res.render('add', {
        lastIndex: PokemonList.length
    })
})

app.delete('/:id', (req, res) => {
    PokemonList.splice(req.params.id, 1)
    res.redirect('/')
})

// edit route

app.get('/:id/edit', (req, res) => {
    res.render('edit', 
    {
        index: req.params.id,
        pokemon: PokemonList[req.params.id]
    })
})

// update route

app.put('/:id/update', (req, res) => {
    PokemonList[req.params.id].name = req.body.name
    PokemonList[req.params.id].img = req.body.img
    PokemonList[req.params.id].type = req.body.type
    PokemonList[req.params.id].stats.hp = req.body.statshp
    PokemonList[req.params.id].stats.attack = req.body.statsattack
    PokemonList[req.params.id].stats.defense = req.body.statsdefense
    PokemonList[req.params.id].stats.speed = req.body.statsspeed
    res.redirect('/')
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

