const express = require('express');
const methodOverride = require('method-override')
const Pokemon = require('./pokemon');
const app = require("liquid-express-views")(express());

const port = 3000;

//Middleware
app.use(methodOverride('_method'))

app.use((req, res, next) => {
    console.log('I run for all routes');
    next();
});

app.use(express.urlencoded({extended:false}));

app.get('/', (req, res) =>{
    res.render('index', {
        allPokemon: Pokemon
    })
});

app.post('/', (req, res) =>{
    Pokemon.push(req.body);
    res.redirect("/pokemon")
});

app.get('/new', (req, res) =>{
    res.render('new')
});

app.get('/:id', (req, res) =>{
    res.render('show', {
        thePokemon: Pokemon[req.params.id]
    })
});

app.post('/:id', (req, res) =>{
    res.render('show', {
        
    })
});

app.get('/:id/edit', (req, res) =>{
    res.render('edit', {
        thePokemon: Pokemon[req.params.id]
    })
});

app.post('/:id/edit', (req, res) => {
    thePokemon: Pokemon[req.params.id]
    res.redirect('/pokemon')
})

/*app.delete('/pokemon/:id', (req, res) =>{
    Pokemon.splice(request.params.id, 1)
    res.redirect('/pokemon')
})*/

app.listen(port, () => {
    console.log('listening');
});