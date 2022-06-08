const express = require("express");
const app = require("liquid-express-views")(express());
const Pokemon = require("./pokedex/pokemon.js");
const methodOverride = require("method-override");
const pokemon = require("./pokedex/pokemon.js");

/////////////////////////////////////
//////MIDDLEWEAR
///////////////////////////////
app.use(methodOverride("_method")); // override for put and delete requests from forms
app.use(express.urlencoded({ extended: true })); // parse urlencoded request bodies
app.use(express.static("public"));

// INDEX
app.get("/pokemon", (req, res) => {
  res.render("index", { data: Pokemon });
})

//NEW - CREAT
app.get("/pokemon/new", (req, res) => {
  res.render("new");
})

//DELETE
app.delete("/pokemon/:id", (req, res) => {
  Pokemon.splice(req.params.id, 1);
  res.redirect("/pokemon");
})

//UPDATE
app.put("/pokemon/:id", (req, res) => {
    console.log(Pokemon[req.params.id])
  Pokemon[req.params.id].name = req.body.name;
 Pokemon[req.params.id].type = req.body.type;
  res.redirect("/pokemon");
})

//CREATE - POST
app.post("/pokemon/", (req, res) => {
  Pokemon.push(req.body);
  res.redirect("/pokemon");
})

//EDIT
app.get("/pokemon/:id/edit", (req, res) => {
  res.render("edit", {
    data: Pokemon[req.params.id],
    taco: req.params.id,
  });
});

// SHOW
app.get("/pokemon/:id", (req, res) => {
  let id = req.params.id;
  res.render("show", { data: Pokemon[id], index: req.params.id });
});

app.listen(3000, () => {
  console.log("Pokemon! I choose you!");
});
