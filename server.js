const express = require('express')
const app = require('liquid-express-views')(express())
app.use(express.urlencoded({extended:false}));
app.use(express.static('public'))
const pokemon = require('./pokedex/pokemon.js')
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

app.get('/',(req,res)=>{
    res.send('hello world')
})

//edit
app.get("/:id/edit",(req,res)=>{
  
    console.log("were editing")
    res.render(
        "edit",
        {
            index: req.params.id,
            pokemon: pokemon[req.params.id]
        })
    })


app.put("/pokemon/:id", (req, res) => {
    pokemon[req.params.id] = req.body; 
    res.redirect("/pokemon"); 
  });

//index
app.get('/pokemon',(req,res)=>{
    res.render('index.liquid',
    {
        pokemonList:pokemon
    })
})

//new
app.get('/pokemon/new',(req,res)=>{
    res.render('new')
})
app.post('/pokemon', (req, res)=>{

    pokemon.push(req.body);
    res.redirect('/pokemon'); 
})

//consolelog
app.use((req, res, next) => {
    console.log('I run for all routes');
    next();
});

//delete
app.delete("/pokemon/:id", (req, res) => {
    pokemon.splice(req.params.id, 1); //remove the item from the array
    res.redirect("/pokemon"); //redirect back to index route
  });

//show route
app.get('/pokemon/:id', (req,res)=>{

    res.render('show',
    {
        pokemonList:pokemon[req.params.id]
    })

})




app.listen(4000,()=>{
    console.log("listning to port 4000")
})