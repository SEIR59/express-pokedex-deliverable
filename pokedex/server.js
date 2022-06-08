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
app.use(express.static("public"));

// INDEX
app.get("/pokemon", (req, res) => {
  res.render("index", { allPokemon: Pokemon });
});

// CREATE
app.post("/pokemon", (req, res) => {
  //   Pokemon.push(req.body);
  Pokemon.push({
    name: req.body.name,
    img: req.body.img,
    type: req.body.type,
    id: req.body.id,
    stats: {
      hp: req.body.hp,
      attack: req.body.attack,
      defense: req.body.defense,
      speed: req.body.speed,
    },
  });
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
  //   Pokemon[req.params.id] = req.body;
  let pokemon = Pokemon[req.params.id];
  pokemon.name = req.body.name;
  pokemon.type = req.body.type;
  pokemon.id = req.body.id;
  pokemon.stats.hp = req.body.hp;
  pokemon.stats.attack = req.body.attack;
  pokemon.stats.defense = req.body.defense;
  pokemon.stats.speed = req.body.speed;
  res.redirect("/pokemon");
});

// app.put("/pokemon/:id", (req, res) => {
//     Pokemon[req.params.id] = {
//       name: req.body.name,
//       type: req.body.type,
//       img: req.body.img,
//       stats: req.body.stats,
//     };
//     res.redirect("/pokemon");
//   });
