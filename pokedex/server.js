const express = require("express");
const app = require("liquid-express-views")(express());
const port = 3000;
const Pokemon = require("./models/pokemon.js");
// static files
app.use(express.static("public"));

// INDEX
app.get("/pokemon", (req, res) => {
  res.render("index", { data: Pokemon });
});

// SHOW
app.get("/pokemon/:id", (req, res) => {
  res.render("show", { data: Pokemon[req.params.id] });
});
// NEW
app.get("/pokemon/new", (req, res) => {
  res.render("new", { data: Pokemon[req.params.id] });
});
// Edit
app.get("/pokemon/:id/edit", (req, res) => {
  res.render("edit", { data: Pokemon[req.params.id] });
});

// Create

// Update

// Delete

app.listen(port, () => {
  console.log("listening to the port 3000");
});
