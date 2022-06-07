const express = require("express");
const app = require("liquid-express-views")(express());
const methodOverride = require("method-override");
const Pokemon = require("./models/pokemon.js");
const rowdy = require('rowdy-logger')
const routesReport = rowdy.begin(app);
const port = 3000

// middleware
// allows us to view body of a post request
// allow us to access data that posting. Can be use add, edit, put, etc. i.e. allow developers use more than just get and post route
app.use(
  express.urlencoded({
    extended: false,
  })
);
// tells express to try to match requests with files in the directory called 'public'
app.use(express.static("public"));
// This prepares our api to receive json data from the body of all incoming requests.
// Do we need this line?
app.use(express.json());

// positioning: as long as it aheads of the route, we will be fine
app.use(methodOverride("_method"));

app.get('/', (req, res) => {
    res.send('Welcome to Pokemon world, please buckle up for exiting experience!')
})

// CREATE
app.post('/pokemon', (req, res) => {
    // res.send('this is create, i created in NEW and redirect to INDEX')
    Pokemon.push(req.body)
    res.redirect('/pokemon')
})

// NEW
app.get('/pokemon/new', (req, res) => {
    // res.send('this is new form')
    res.render(
        'new'
    )
})

// INDEX
app.get('/pokemon', (req, res) => {
    res.render(
        'index',
        {
            allPokemon: Pokemon
        }
    )
})

// SHOW
app.get('/pokemon/:id', (req, res) => {
    // console.log(Pokemon[req.params.id].type)
    res.render(
        'show',
        {
            pokemon: Pokemon[req.params.id]
        }
    )
})

// DELETE
app.delete('/pokemon/:id', (req, res) => {
    // console.log('I am delete')
    Pokemon.splice(req.params.id, 1)
    res.redirect('/pokemon')
})

// EDIT
app.get('/pokemon/:id/edit', (req, res) => {
    // res.send('i can edit')
    res.render(
        'edit',
        {
            pokemon: Pokemon[req.params.id],
            id: req.params.id
        }
    )
})

// UPDATE
app.put('/pokemon/:id', (req, res) => {
    console.log('I can update')
    Pokemon[req.params.id] = {
        id: req.body.id,
        name: req.body.name,
        img: req.body.img,
        type: req.body.type,
        stats: {
            hp: req.body.hp,
            attack:req.body.attack,
            defense: req.body.defense,
            spattack: req.body.spattack,
            spdefense: req.body.spdefense,
            speed: req.body.speed
        }
    }
    res.redirect('/pokemon')
})

app.listen(port, () => {
    console.log('port 3000 listens')
    routesReport.print()
})
