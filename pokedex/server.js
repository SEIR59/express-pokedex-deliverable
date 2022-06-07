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

// CREATE
app.post("/pokemon", (req, res) => {
  Pokemon.push(req.body);
  res.redirect("/pokemon");
});

// NEW
app.get("/pokemon/new", (req, res) => {
  res.render("new");
});

// SHOW
app.get("/pokemon/:id", (req, res) => {
  res.render("show", { pokemon: Pokemon[req.params.id] });
});

// DELETE
app.delete("/pokemon/:id", (req, res) => {
  Pokemon.splice(req.params.id, 1); //remove the item from the array
  res.redirect("/pokemon");
});

// EDIT
app.get("/pokemon/:id/edit", (req, res) => {
  res.render("edit", {
    pokemon: Pokemon[req.params.id],
    index: req.params.id,
  });
});

app.put("/pokemon/:id", (req, res) => {
  Pokemon[req.params.id] = req.body;
  res.redirect("/pokemon");
});
