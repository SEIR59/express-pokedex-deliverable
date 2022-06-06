const express    = require('express');
const app = require("liquid-express-views")(express())
const Pokemon = require('./pokedex/pokemon.js');

app.use(express.urlencoded({
    extended: false
}))
app.use(express.json())
app.use(express.static('public'));


app.get('/', (req, res) => {
    res.render('index.liquid', { data: Pokemon});
    });

    app.get('/:id', (req, res) => {
        res.render('show.liquid', { data: Pokemon[req.params.id] });
        });
    
app.listen(3000, () => {
    console.log("listening on port 3000!")
})
