const express = require('express')
const app = require('liquid-express-views')(express())
const PokemonList = require('./models/pokedex/pokemon.js')
const pokemon = require('./models/pokedex/pokemon.js')

let port = 3000
app.listen(port, () => {
    console.log("Listining on port: ", port)
}) 

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

