const express = require("express");
const app = require("liquid-express-views")(express());
const methodOverride = require("method-override");
const Pokemon = require("./models/pokemon.js");

const port = 3000;

app.listen(port, () => {
  console.log("app is running on port: ", port);
});

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride("_method"));

// INDEX
app.get("/pokemon", (req, res) => {
  res.render("index", { allPokemon: Pokemon });
});

app.post("/pokemon", (req, res) => {
  Pokemon.push(req.body);
  console.log(Pokemon);
  res.redirect("/pokemon");
});

app.get("/pokemon/new", (req, res) => {
  res.render("new");
});

// SHOW
app.get("/pokemon/:id", (req, res) => {
  res.render("show", { pokemon: Pokemon[req.params.id] });
});
