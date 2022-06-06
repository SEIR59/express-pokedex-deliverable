const express = require('express');

const app = require("liquid-express-views")(express())

const Pokemon = require('./data/pokemon.js');
//const methodOverride = require("method-override");
//app.use(methodOverride("_method"));
app.use(express.static('public'));
app.use(express.json()) 
app.use(express.urlencoded({
    extended: false
})) 
// INDEX
app.get('/pokemon', (req, res) => {
    res.render('index', { data: Pokemon });
});


// SHOW
app.get('/pokemon/:id', (req, res) => {
    res.render('show', { data: Pokemon[req.params.id] });
});

//app.get()

app.get('/pokemon/new', (req, res)=>{
    res.render('new')
})



app.listen(3000, () => {
    console.log("listening on port 3000!")
    //routesReport.print()
})

