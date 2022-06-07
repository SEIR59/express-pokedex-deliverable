const express = require("express");
const app = require("liquid-express-views")(express());
const port = 3000;
const pokemon = require("./pokedex/pokemon");

//middleware - must always be at the top
app.use((req, res, next) => {
  console.log(`I run for all routes`);
  next();
});
//express function body parser middleware
app.use(express.urlencoded({ extended: false }));

app.use(express.static("public")); //tells express to try to match requests with files in the directory called 'public'


// INDEX
app.get("/pokemon", (req, res) => {
  res.render("index", { allPokemon: pokemon });
});

// SHOW
app.get("/pokemon:id", (req, res) => {
  res.render("show", { data:pokemon[req.params.id] });
});

app.listen(port, () => {
  console.log(`Listening`);
});
