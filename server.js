const express = require("express");
const pokemon = require("./pokedex/pokemon");
const app = require("liquid-express-views")(express());
const port = 3000;
const Pokemon = require("./pokedex/pokemon");
const methodOverride = require('method-override');

//middleware - must always be at the top
app.use((req, res, next) => {
  console.log(`I run for all routes`);
  next();
});

app.use(express.json()) // This prepares our api to receive json data from the body of all incoming requests.

app.use(methodOverride('_method'));

//express function body parser middleware
app.use(express.urlencoded({ extended: false }));

app.use(express.static("public")); //tells express to try to match requests with files in the directory called 'public'

/////////////////////////
// ROUTES
/////////////////////////
// INDEX - GET
app.get("/pokemon", (req, res) => {
  res.render("index", { data : Pokemon } );
});

//NEW - GET
app.get('/pokemon/new', (req,res) => {
  res.render('new')
});

//DELETE
app.delete('/pokemon/:id', (req,res) => {
  Pokemon.splice(req.params.id, 1),
  res.redirect('/pokemon');
})

//UPDATE - PUT
app.put('/pokemon/:id', (req,res) => {
  console.log(req.body)
  Pokemon[req.params.id] = req.body
  res.redirect('/pokemon')
})

//CREATE - POST
app.post("/pokemon", (req,res) => {
  Pokemon.push(req.body);
  res.redirect('/pokemon')
})

//EDIT - GET
app.get('/pokemon/:id/edit', (req,res) => {
  res.render(
    'edit',
    {
      data: Pokemon[req.params.id],
      index: req.params.id
    }
    )
  })
  
// SHOW
app.get("/pokemon/:id", (req, res) => {
  console.log(Pokemon[req.params.id])
  res.render("show", {data: Pokemon[req.params.id] });
});

app.listen(port, () => {
  console.log(`Listening`);
});
