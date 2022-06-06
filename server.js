const express = require("express");
const app = require("liquid-express-views")(express());
const Pokemon = require("./pokedex/pokemon.js");

app.get("/", (req, res) => {
  res.send("testing");
});

// INDEX
app.get("/pokemon", (req, res) => {
//   res.send("testing")
    res.render("index", //index.Liquid
  {
    data: Pokemon,
  });
});

// app.get("/pokemon/:id", (req, res) => {
//     res.render("show", {
//         pokemon:
//     })
// })

// // SHOW
// app.get('/:id', (req, res) => {
// res.render('show.liquid', { data: Pokemon[req.params.id] });
// });

// PORT
app.listen(3002, () => {
  console.log("port 3002 is active");
});
