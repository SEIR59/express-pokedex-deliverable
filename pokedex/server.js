const express = require('express');
const Pokemon = require('./models/pokemon.js')
const app = require("liquid-express-views")(express())
const methodOverride = require('method-override');
const pokemon = require('./models/pokemon.js');

app.use(express.urlencoded({
    extended: false
}))
app.use(express.static('public'))
app.use(methodOverride('_method'))
// INDEX
app.get('/', (req, res) => {
    res.render('index', { data: Pokemon });
});

app.get('/pokemon/new', (req, res) => {
    res.render('new')
})
app.post('/pokemon', (req, res) => {
    Pokemon.push({
        name: req.body.name,
        type: req.body.type,
        id: Pokemon.length + 1,
        stats: {
            hp: req.body.hp,
            attack: req.body.attack,
            speed: req.body.speed
        }
    })
    console.log(req.body)
    res.redirect('/')
})

// SHOW
app.get('/:id', (req, res) => {
    res.render('show.liquid', { data: Pokemon[req.params.id], index: req.params.id })
})
app.put("/pokemon/:index", (req, res) => {
    console.log(req.body)
    Pokemon[req.params.index] = {
        name: req.body.name,
        type: req.body.type,
        img: Pokemon[req.params.index].img,
        id: Pokemon[req.params.index].id,
        stats: {
            hp: req.body.hp,
            attack: req.body.attack,
            speed: req.body.speed
        }
    };
    res.redirect("/"); //redirect to the index page
})
app.get("/pokemon/:index/edit", (req, res) => {
    res.render(
        "edit", //render views/edit.liquid
        {
            //pass in an object that contains
            pokemon: Pokemon[req.params.index],
            index: req.params.index
        }
    )
})


app.delete("/pokemon/:index", (req, res) => {
    Pokemon.splice(req.params.index, 1); //remove the item from the array
    res.redirect("/"); //redirect back to index route
});

app.listen(3000, () => {
    console.log("listening on port 3000!")
})