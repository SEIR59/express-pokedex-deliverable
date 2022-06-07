// Dependencies
const express = require('express');
const app = require("liquid-express-views")(express());
const Pokemon = require('./models/pokemon.js');

// Middleware
app.use(express.static('public'))
app.use(express.urlencoded({extended:false}));

// app.get('/', (req, res) => {
//     res.send("test")

// INDEX (const data = Pokemon)
app.get("/pokemon", (req, res) => {
res.render('index', { data: Pokemon });
});


// SHOW
app.get("/pokemon/:id", (req, res) => {
    res.render('show', { data: Pokemon[req.params.id] });
    
});


// Port listening
app.listen(3500, () => {
    console.log("listening on port 3500!")
});