const express    = require('express');
const { type, redirect } = require('express/lib/response');
const app = require("liquid-express-views")(express())
const Pokemon = require('./pokedex/pokemon.js');
const methodOverride= require('method-override')





app.use((req, res, next) => {
    console.log('I run for all routes');
    next();
});

app.use(express.urlencoded({
    extended: false
}))
app.use(express.json())
app.use(express.static('public'));
app.use(methodOverride("_method"));


app.get('/', (req, res) => {
    res.render('index.liquid', { data: Pokemon});
    });


    app.get('/pokemon/new',(req,res)=>{
        res.render('new')
})

 
app.get('/pokemon/:id/edit',(req,res)=>{
res.render('edit',{
    data: Pokemon[req.params.id] ,
    index: req.params.id,
         name:Pokemon[req.params.id].name,
         type: Pokemon[req.params.id].type,
         id: Pokemon[req.params.id].id,
         hp:Pokemon[req.params.id].stats.hp,
         attack:Pokemon[req.params.id].stats.attack,
         defense:Pokemon[req.params.id].stats.defense,
         spattack:Pokemon[req.params.id].stats.spattack,
         speed :Pokemon[req.params.id].stats.speed,
         img:Pokemon[req.params.id].img
})
})

app.get('/:id', (req, res) => {
    res.render('show.liquid', { data: Pokemon[req.params.id] ,
        index: req.params.id,

    });
    });



app.post('/pokemon', (req,res)=>{
    Pokemon.push(req.body);
    console.log(req.body);
    res.redirect('/')
})

app.put('/pokemon/:id',(req,res)=>{
    Pokemon[req.params.id] = req.body; 
   
    res.redirect("/")

})


app.listen(3000, () => {
    console.log("listening on port 3000!")
})
