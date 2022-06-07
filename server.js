const express = require('express');
const pokemon = require('./data/pokemon.js');

const app = require("liquid-express-views")(express())

const Pokemon = require('./data/pokemon.js');

app.use(express.static('public'));
app.use(express.json()) 
app.use(express.urlencoded({
    extended: false
})) 

app.use((req, res, next) => {
    //  console.log('I run for all routes');
    next();
});
// INDEX
app.get('/pokemon', (req, res) => {
    res.render('index', { data: Pokemon });
});


// SHOW
app.get('/pokemon/:id', (req, res) => {
    res.render('show', { data: Pokemon[req.params.id] });
});




app.listen(3000, () => {
    console.log("listening on port 3000!")
    //routesReport.print()
})

