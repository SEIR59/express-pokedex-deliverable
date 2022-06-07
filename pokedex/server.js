const express = require("express");
const app = require("liquid-express-views")(express());
const port = 3000;
const Pokemon = require("./models/pokemon.js");
const methodOverride = require("method-override");

// pull out distinct type
let typesLookup = {};
let items = Pokemon;
let distinctTypes = [];

for (let item, i = 0; (item = items[i++]); ) {
  for (let y = 0; y < item.type.length; y++) {
    let type = item.type[y];

    if (!(type in typesLookup)) {
      typesLookup[type] = 1;
      distinctTypes.push(type);
    }
  }
}
console.log(distinctTypes);

app.use(express.static("public"));
app.use(methodOverride("_method"));

// middleware
app.use((req, res, next) => {
  console.log("running for all routes");
  next();
});
//near the top, around other app.use() calls
app.use(express.urlencoded({ extended: false }));

// Create - post
app.post("/pokemon", (req, res) => {
  // transcript type check box into type array
  req.body.type = [];
  for (let i = 0; i < distinctTypes.length; i++) {
    let typeVar = distinctTypes[i];
    // cannot use window - it's in node js
    // have to use eval ....
    if (eval("req.body." + typeVar) == "on") {
      req.body.type.push(distinctTypes[i]);
    }
  }
  // store stats
  req.body.stats = {
    hp: req.body.hp,
    attack: req.body.attack,
    defense: req.body.defense,
    spattack: req.body.spattack,
    spdefense: req.body.spdefense,
    speed: req.body.speed,
  };

  Pokemon.push(req.body);
  res.redirect("/pokemon");
});

// Index
app.get("/pokemon", (req, res) => {
  res.render("index", { data: Pokemon });
});
// New
app.get("/pokemon/new", (req, res) => {
  res.render("new", { types: distinctTypes });
});

// Show
app.get("/pokemon/:id", (req, res) => {
  res.render("show", { data: Pokemon[req.params.id] });
});

// Edit
app.get("/pokemon/:id/edit", (req, res) => {
  res.render("edit", {
    data: Pokemon[req.params.id],
    index: req.params.id,
    allTypes: distinctTypes,
  });
});

// Update - put
app.put("/pokemon/:id", (req, res) => {
  // transcript type check box into type array
  req.body.type = [];
  for (let i = 0; i < distinctTypes.length; i++) {
    let typeVar = distinctTypes[i];
    // cannot use window - it's in node js
    // have to use eval ....
    if (eval("req.body." + typeVar) == "on") {
      req.body.type.push(distinctTypes[i]);
    }
  }

  req.body.stats = {
    hp: req.body.hp,
    attack: req.body.attack,
    defense: req.body.defense,
    spattack: req.body.spattack,
    spdefense: req.body.spdefense,
    speed: req.body.speed,
  };
  console.log(req.body);
  Pokemon[req.params.id] = req.body;

  res.redirect("/pokemon");
});
// Delete
app.delete("/pokemon/:id", (req, res) => {
  Pokemon.splice(req.params.id, 1);
  res.redirect("/pokemon");
});

app.listen(port, () => {
  console.log("listening to the port 3000");
});
