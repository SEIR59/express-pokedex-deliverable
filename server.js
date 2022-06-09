const express = require('express')
const app = require('liquid-express-views')(express())
const methodOverride = require('method-override')
const Pokemon = require("./models/pokemon")
const exp = require('constants')

const port = 3000



app.use(express.urlencoded({extended:false}));
app.use(methodOverride("_method"));
app.use(express.static('public'))


// INDEX
app.get('/pokedex', (req, res) => {
  console.log('you hit the index route')
  res.render('index', 
  
    { 
      pokedex: Pokemon,
  });
  });


// New    
app.get('/pokedex/new', (req, res) => {
  console.log('you hit the new route')
  res.render('new')
  })

//POST
app.post('/pokedex/create', (req, res) => {
  console.log('This is the post route')

  Pokemon.push({
      name: req.body.name,
      img: req.body.img,
      type: req.body.type,
      id: req.body.id,
      stats: {
          hp: req.body.hp,
          attack: req.body.attack,
          defense: req.body.defense
      }
  })
  res.redirect('/pokedex')
})

// DELETE
app.delete('/pokedex/:id', (req, res) => {
  console.log('delete route hit')
  Pokemon.splice(req.params.id, 1)
  res.redirect('/pokedex')

})


// EDIT
app.get('/pokedex/:id/edit', (req,res) => {
  console.log('You hit the edit route ')
  res.render('edit', {
      Pokemon: Pokemon[req.params.id],
      id: req.params.id,
  })

})
//UPDATE
app.put('/pokedex/:id',(req, res) => {
  console.log('put route hit')
  console.log(req.body)
  let pokemon = Pokemon[req.params.id]
  pokemon.name = req.body.name
  pokemon.type = req.body.type
  pokemon.id = req.body.id
  pokemon.stats.hp = req.body.hp
  pokemon.stats.attack = req.body.attack
  pokemon.stats.defense = req.body.defense

  res.redirect(`/pokedex`)
})


// SHOW
app.get('/pokedex/:id', (req, res) => {
  console.log('you hit the show route')

  res.render('show', { 
      Pokemon: Pokemon[req.params.id],
      stats: Pokemon[req.params.id.stats],

      });
      console.log(Pokemon[req.params.id])
  });


app.listen(3000, () => {
  console.log('listening to port 3000')
})
