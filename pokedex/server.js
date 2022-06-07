const express = require("express");
const app = require("liquid-express-views")(express());
const port = 3000;
const Pokemon = require("./models/pokemon.js");
const methodOverride = require("method-override");

// static files
app.use(express.static("public"));
app.use(methodOverride("_method"));

// middleware
app.use((req, res, next) => {
  console.log("running for all routes");
  next();
});
//near the top, around other app.use() calls
app.use(express.urlencoded({ extended: false }));

app.post("/pokemon", (req, res) => {
  Pokemon.push(req.body);
  res.redirect("/pokemon");
});

// INDEX
app.get("/pokemon", (req, res) => {
  res.render("index", { data: Pokemon });
});
// NEW
app.get("/pokemon/new", (req, res) => {
  res.render("new");
});

// SHOW
app.get("/pokemon/:id", (req, res) => {
  res.render("show", { data: Pokemon[req.params.id] });
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
