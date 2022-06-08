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
app.get('/pokemon/new', (req, res) => {
  res.render('new')
})

//Post Route

app.post('/pokemon', (req, res) => {
  
  Pokemon.push(req.body);
  console.log(req.body);
  res.redirect('/pokemon'); //send the user back to /index
});

// SHOW

app.get('/pokemon/:id', (req, res) => {
    
  res.render('show', {
    data: Pokemon[req.params.id]
  })

})


//edit route
app.get('/pokemon/:id/edit', (req, res) => {
  res.render(
      'edit',
      {
          data: Pokemon[req.params.id], 
          index: req.params.id
      })
      
})

app.put('/pokemon/:id', (req, res) => {
  
  Pokemon[req.params.id] = req.body
  
})

//Listener
app.listen(port, (req, res) => {
    console.log('We are live from 3000, the pokemon center')
})

