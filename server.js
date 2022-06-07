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
    res.render('index.liquid', { allPokemon: Pokemon });
});

// NEW
app.get('/pokemon/new', (req, res) => {
    res.render('new')
})

// SHOW
app.get('/pokemon/:id', (req, res) => {
    res.render('show.liquid', { allPokemon: Pokemon[req.params.id] });
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