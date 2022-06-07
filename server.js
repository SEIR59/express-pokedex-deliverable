const express = require("express");
const pokemon = require("./pokedex/pokemon");
const app = require("liquid-express-views")(express());
const port = 3000;
const Pokemon = require("./pokedex/pokemon");

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
  res.render("index", { data : Pokemon } );
});

//POST
app.post("/pokemon", (req,res) => {
  Pokemon.push(req.body);
  res.redirect('/pokemon')
})

//NEW
app.get('/pokemon/new', (req,res) => {
  res.render('new')
});

// SHOW
app.get("/pokemon/:id", (req, res) => {
  res.render("show", {data: Pokemon[req.params.id] });
});

app.listen(port, () => {
  console.log(`Listening`);
});
