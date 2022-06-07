const express = require('express');
const app  = require("liquid-express-views")(express())
const Pokemon = require('./pokedex/pokemon.js');
const methodOverride = require('method-override');
const pokemon = require('./pokedex/pokemon.js');
app.use(methodOverride("_method")); // override for put and delete requests from forms
app.use(express.urlencoded({ extended: true })); // parse urlencoded request bodies
app.use(express.static("public")); 

// INDEX
app.get('/pokemon', (req, res) => {
res.render('index', { data: Pokemon });
});
//NEW
app.get('/pokemon/new', (req,res) =>{
    res.render('new')
})
//Creat Post
app.post('/pokemon/' ,(req,res) =>{
    Pokemon.push(req.body)
    res.redirect('/pokemon')
})

// SHOW
app.get('/pokemon/:id', (req, res) => {
    let id = req.params.id
res.render('show', { data: Pokemon[id] });

});
//EDIT
app.get('/pokemon/:id/edit' , (req, res) =>{
    res.render('edit', 
    {
    data: Pokemon[req.params.id],
    index: req.params.id
        })
})

 app.put('/pokemon/:id', (req, res) =>{
      
    Pokemon[req.params.id]= req.body
      res.redirect('/pokemon')
  })


app.listen(3000 , () =>{
    console.log("Pokemon! I choose you!")
})

