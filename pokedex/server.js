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
  try {
    res.render('show', { Pokemon: Pokemon[req.params.id] });
  } catch (error) {
    res.status(500).json({ Message: error.message });
  }
});

//? EDIT
app.get('/pokemon/:id/edit', (req, res) => {
  try {
    let chosenPokemon = Pokemon[req.params.id];
    // chosenPokemon.type = chosenPokemon.type.join(',');
    res.render('edit', { Pokemon: chosenPokemon, index: req.params.id });
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
    chosenPokemon.type = type.split(',');
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
