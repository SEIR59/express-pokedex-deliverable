//All items needed to run this code
const express = require('express');
const methodOverride = require('method-override')
const Pokemon = require('./pokemon');
const app = require("liquid-express-views")(express());

//Sets the port to listen on
const port = 3000;

//Middleware
app.use(methodOverride('_method'))
app.use(express.urlencoded({extended:true}));

//Runs every time server is run
app.use((req, res, next) => {
    console.log('I run for all routes');
    next();
});

//Route for main page
app.get('/', (req, res) =>{
    res.render('index', {
        allPokemon: Pokemon
    })
});

//Pushes new Pokemon to main page
app.post('/', (req, res) =>{
    Pokemon.push(req.body);
    res.redirect("/")
});

//Directs user to the new Pokemon form
app.get('/new', (req, res) =>{
    res.render('new')
});

//Directs user to page of each Pokemon
app.get('/:id', (req, res) =>{
    res.render('show', {
        thePokemon: Pokemon[req.params.id],
        id: req.params.id
    })
});

//Takes user to the edit page for individual Pokemon
app.get('/edit/:id', (req, res) =>{
    res.render('edit', {
        thePokemon: Pokemon[req.params.id],
        id: req.params.id
    })
});

//Sets the new values for selected Pokemon
app.put('/edit/:id', (req, res) => {
    let thePokemon = Pokemon[req.params.id]
    thePokemon.name = req.body.name
    thePokemon.img = req.body.img
    thePokemon.type = req.body.type
    thePokemon.id = req.body.id
    thePokemon.hp = req.body.hp
    thePokemon.attack = req.body.attack
    thePokemon.defense = req.body.defense
    res.redirect('/')
})

//Takes item out of the database
app.delete('/:id', (req, res) =>{
    Pokemon.splice(req.params.id, 1)
    res.redirect('/')
})

//Updates port
app.listen(port, () => {
    console.log('listening');
});