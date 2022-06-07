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
app.delete('/pokemon/:id',)

//UPDATE - PUT
app.put('/pokemon/:id',)

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
  res.render("show", {data: Pokemon[req.params.id] });
});

app.listen(port, () => {
  console.log(`Listening`);
});
