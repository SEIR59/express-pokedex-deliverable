const express    = require('express');
const app        = express();
const Pokemon = require('./pokedex/pokemon.js');


app.get('/', (req, res) => {
    res.send('testing')
})


// // INDEX
// app.get('/', (req, res) => {
// res.render('index.liquid', { data: Pokemon });
// });


// // SHOW
// app.get('/:id', (req, res) => {
// res.render('show.liquid', { data: Pokemon[req.params.id] });
// });









// PORT
app.listen(3002, () => {
    console.log("port 3002 is active")
})