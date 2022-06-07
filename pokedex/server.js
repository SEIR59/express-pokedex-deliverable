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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  routesReport.print();
});
