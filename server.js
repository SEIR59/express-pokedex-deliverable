const pokemons = require('./pokedex/models/pokemon.js');
const express = require('express');
const { redirect } = require('express/lib/response');
const app = require("liquid-express-views")(express());
const methodOverride = require('method-override');

// use methodOverride, will add query parameter to our delete form named _method
app.use(methodOverride('_method'));
// allows us to view body of a post request
app.use(express.urlencoded({
    extended: false
}))
//tells express to try to match requests with files in the directory called 'public'
app.use(express.static('public'));
// This prepares our api to receive json data from the body of all incoming requests.
app.use(express.json())

// Index
// GET /pokemon
// Show
// GET /pokemon/:id
// New
// GET /pokemon/new
// Edit
// GET /pokemon/:id/edit
// Create
// POST /pokemon
// Update
// PUT /pokemon/:id
// Destroy
// DELETE /pokemon/:id

app.get('/pokemon', (req, res) => {
    res.render('index', {
        allPokemons: pokemons
    })
});

app.get('/pokemon/:id', (req, res) => {
    
});

app.get('/pokemon/new', (req, res) => {
    
});

app.post('/pokemon', (req, res) => {

});

app.get('/pokemon/:id/edit', (req, res) => {

});

app.put('/pokemon/:id', (req, res) => {

});

app.delete('/pokemon/:id', (req, res) => {

});

app.listen(3000, () => {
    console.log("listening on port 3000!");
})