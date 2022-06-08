const express = require('express')
const app = require("liquid-express-views")(express())
const port = 3000;
const pokemons = require('./pokedex/pokemon.js')
const methodOverride = require('method-override');
const { request } = require('express');

app.use(express.urlencoded({
    extended: false
})) 
app.use(express.static('public'))
app.use(methodOverride('_method'))

// INDEX
app.get('/pokemon', (req, res) => {
    res.render(
        'index', {
            pokemon: pokemons
        }
        )
    })
 
// NEW
app.get('/pokemon/new', (req, res) => {
    res.render(
        'new', {
            pokemon: pokemons
        }
        )
    })

// POST
app.post('/pokemon', (req, res) => {
    console.log("request,body", req.body)
    pokemons.unshift({
        name: req.body.name,
        img: req.body.img,
        type: req.body.type,
        stats: {
            hp: req.body.hp,
            attack: req.body.attack,
            defense: req.body.defense
        }})
    res.redirect('/pokemon')
})

// SHOW
app.get('/pokemon/:id', (req, res) => {
    res.render(
        'show',       
        {
            pokemon: pokemons[req.params.id],
            index: req.params.id
        }
        )
    })

// DELETE
app.delete('/pokemon/:id', (req, res) => {
        console.log("hiddendelete")
        pokemons.splice(req.params.id, 1)
        res.redirect('/pokemon')
     })  

// EDIT
app.get('/pokemon/:id/edit', (req, res) => {
        res.render(
            'edit',
            {
                pokemon: pokemons[req.params.id],
                index: req.params.id
                
            }
        )
    })

// UPDATE
app.put('/pokemon/:id', (req, res) => {
    // pokemons[req.params.id] = req.body
    console.log("request,body", req.body)
    pokemons[req.params.id] = {
        name: req.body.name,
        img: req.body.img,
        type: req.body.type,
        stats: {
            hp: req.body.hp,
            attack: req.body.attack,
            defense: req.body.defense
        }}
    res.redirect('/pokemon')
})

// LISTEN
app.listen(port, () => {
    console.log("Now listening on port 3000 :)")
})