const express = require('express');
const app  = require("liquid-express-views")(express())
const Pokemon = require('./pokedex/pokemon.js');


// INDEX
app.get('/pokemon', (req, res) => {
res.render('index', { data: Pokemon });
});


// SHOW
app.get('/pokemon/:id', (req, res) => {
    let id = req.params.id
res.render('show', { data: Pokemon[id] });

});

app.listen(3000 , () =>{
    console.log("Pokemon! I choose you!")
})

