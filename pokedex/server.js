const express = require('express');
const Pokemon = require('./models/pokemon.js')
const app = require("liquid-express-views")(express())
app.use(express.urlencoded({
    extended: false
}))
// INDEX
app.get('/', (req, res) => {
    res.render('index', { data: Pokemon });
});

app.get('/pokemon/new', (req, res) => {
    res.render('new')
})
app.post('/pokemon', (req, res) => {
    Pokemon.push(req.body);
    console.log(req.body);
    res.redirect('/')
})

// SHOW
app.get('/:id', (req, res) => {
    res.render('show.liquid', { data: Pokemon[req.params.id],index: req.params.id })
})

app.get("/pokemon/:index/edit", (req, res) => {
    res.render(
      "edit", //render views/edit.liquid
      {
        //pass in an object that contains
        pokemon: Pokemon[req.params.index],
        index: req.params.index }
    )
  })




app.listen(3000, () => {
    console.log("listening on port 3000!")
})