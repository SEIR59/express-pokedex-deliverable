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

//const methodOverride = require("method-override");
//app.use(methodOverride("_method"));

// INDEX
app.get('/pokemon', (req, res) => {
    res.render('index', { data: Pokemon });
});


// SHOW
app.get('/pokemon/:id', (req, res) => {
    res.render('show', { data: Pokemon[req.params.id] });
});

//app.get('/pokemon/:id/edit', (req, res) => {
    // res.render('edit', { data: Pokemon[req.params.id] });
 //});
 
 
 app.get('/pokemon/new', (req, res)=>{
     res.render('new')
 })

app.delete('/pokemon/:id', (req, res) => {
    //remove item from array
    pokemon.splice(req.params.id, 1)
    res.redirect('/pokemon')//redirect back to index 
})



app.listen(3000, () => {
    console.log("listening on port 3000!")
    //routesReport.print()
})

