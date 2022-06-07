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
app.get("/", (req, res) => {
  res.render("index", { allPokemon: Pokemon });
});

// SHOW
app.get("/:id", (req, res) => {
  res.render("show", { pokemon: Pokemon[req.params.id] });
});
