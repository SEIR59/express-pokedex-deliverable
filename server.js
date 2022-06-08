const express    = require('express');
const app = require('liquid-express-views')(express());
const Pokemon = require('./models/pokemon.js');
const methodOverride = require('method-override')
const rowdy = require('rowdy-logger')
const routeReport = rowdy.begin(app)
const port = 3000

// Middleware
app.use(methodOverride("_method")); // override for put and delete requests from forms
app.use(express.urlencoded({ extended: true })); // parse urlencoded request bodies
app.use(express.static("public")); // serve files from public statically

// Homepage
app.get('/', (req,res) => {
    res.send('working')
})

// CREATE
app.post('/pokemon', (req,res) => {
    Pokemon.push(req.body)
    res.redirect('/pokemon')
})

// INDEX
app.get('/pokemon', (req, res) => {
    res.render('index.liquid', { 
        allPokemon: Pokemon });
});

// NEW
app.get('/pokemon/new', (req, res) => {
    res.render('new')
})
/////////////////////////////
// Can't figure out why after editing a Pokemon, it doesnt return to the index after clicking submit. Have to use the Back to Pokedex button, and it shows the updated entry there. Also can't get stat values to hold during entry, only names and types populate.
/////////////////////////////
// EDIT
app.get('/pokemon/:id/edit', (req,res) => {
    res.render('edit', { 
        allPokemon: Pokemon[req.params.id], 
        id: req.params.id})
})

// UPDATE
app.put('/pokemon/:id', (req,res) => {
    Pokemon[req.params.id] = {
        id: req.body.id,
        name: req.body.name,
        img: req.body.img,
        type: req.body.type
    }
})

// SHOW
app.get('/pokemon/:id', (req, res) => {
    res.render('show.liquid', { 
        allPokemon: Pokemon[req.params.id] });
});

// DELETE
app.delete('/pokemon/:id', (req, res) => {
    Pokemon.splice(req.params.id, 1)
    res.redirect('/pokemon')
})


// PORT
app.listen(port, () => {
    console.log("working")
    routeReport.print()
})