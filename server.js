const express    = require('express');
const app        = require('liquid-express-views')(express())
const port = 3000
const Pokemon = require('./pokedex/pokemon');





// INDEX
app.get('/pokemon', (req, res) => {

    res.render('index', { 
        data: Pokemon });
});

//NEW
app.get('/fruits/new', (req, res) => {
  res.render('new')
})
// SHOW

app.get('/pokemon/:id', (req, res) => {
    
  res.render('show', {
    data: Pokemon[req.params.id]
  })

})


app.listen(port, (req, res) => {
    console.log('We are live from 3000, the pokemon center')
})

