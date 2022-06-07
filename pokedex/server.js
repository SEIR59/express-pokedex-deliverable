const express = require('express');
const rowdy = require('rowdy-logger');
const morgan = require('morgan');
const app = require('liquid-express-views')(express());
const routesReport = rowdy.begin(app);
const methodOverride = require('method-override');
const Pokemon = require('./models/pokemon');
const port = 3000;

///! * -------------------------------------------------------------------------- */
///! *                               // MIDDLEWARES                               */
///! * -------------------------------------------------------------------------- */
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(methodOverride('_method'));
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());

//? INDEX
app.get('/pokemon', (req, res) => {
  try {
    res.render('index', { Pokemons: Pokemon });
  } catch (error) {
    res.status(500).json({ Message: error.message });
  }
});

//? NEW
app.get('/pokemon/new', (req, res) => {
  try {
    res.render('new');
  } catch (error) {
    res.status(500).json({ Message: error.message });
  }
});

//? SHOW
app.get('/pokemon/:id', (req, res) => {
  console.log('show', Pokemon[req.params.id].type);
  console.log('typeof', typeof Pokemon[req.params.id].type);

  try {
    if(typeof Pokemon[req.params.id].type === 'string') {
      Pokemon[req.params.id].type = Pokemon[req.params.id].type.split(",")
    }
    res.render('show', { Pokemon: Pokemon[req.params.id] });
  } catch (error) {
    res.status(500).json({ Message: error.message });
  }
});

//? EDIT
app.get('/pokemon/:id/edit', (req, res) => {
  try {
    console.log(typeof Pokemon[req.params.id].type, Pokemon[req.params.id].type);
    if(typeof Pokemon[req.params.id].type !== 'string'){
      Pokemon[req.params.id].type = [...Pokemon[req.params.id].type]
    // ! Trims the white spaces for each type of the pokemon type array
    Pokemon[req.params.id].type = Pokemon[req.params.id].type.map(item => item.trim());

    // ! Concatenante each type with comma (,) and turn the array into one string using join method
    Pokemon[req.params.id].type = Pokemon[req.params.id].type.join(',');
    }
    res.render('edit', { Pokemon: Pokemon[req.params.id], index: req.params.id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ Message: error.message });
  }
});

//? CREATE
app.post('/pokemon', (req, res) => {
  try {
    let lastId = Pokemon[Pokemon.length - 1].id;
    const { name, type, hp, attack, defense, spattack, spdefense, speed, img } =
      req.body;
    let newPokemon = {
      id: lastId + 1,
      name,
      img,
      type: [type],
      stats: {
        hp,
        attack,
        defense,
        spattack,
        spdefense,
        speed,
      },
    };
    Pokemon.push(newPokemon);
    res.redirect('/pokemon');
  } catch (error) {
    console.log(error);
    res.status(500).json({ Message: error.message });
  }
});

//? DELETE
app.delete('/pokemon/:id', (req, res) => {
  try {
    Pokemon.splice(req.params.id, 1);
    res.redirect('/pokemon');
  } catch (error) {
    console.log(error);
    res.status(500).json({ Message: error.message });
  }
});

//? UPDATE
app.put('/pokemon/:id', (req, res) => {
  try {
    let chosenPokemon = Pokemon[req.params.id];
    const { name, type, hp, attack, defense, spattack, spdefense, speed, img } =
      req.body;

    chosenPokemon.name = name;
    chosenPokemon.type = type.trim().split(',');
    chosenPokemon.img = img;
    chosenPokemon.stats.hp = hp;
    chosenPokemon.stats.attack = attack;
    chosenPokemon.stats.defense = defense;
    chosenPokemon.stats.spattack = spattack;
    chosenPokemon.stats.spdefense = spdefense;
    chosenPokemon.stats.speed = speed;

    res.redirect('/pokemon');
  } catch (error) {
    console.log(error);
    res.status(500).json({ Message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  routesReport.print();
});
