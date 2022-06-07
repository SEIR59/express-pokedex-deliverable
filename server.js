const express = require("express");
const app = require("liquid-express-views")(express());
const Pokemon = require("./pokedex/pokemon.js");

//include the method-override package
const methodOverride = require("method-override");

//how we are connecting our css page
app.use(express.static('public')); //tells express to try to match requests with files in the directory called 'public'


//near the top, around other app.use() calls
app.use(express.urlencoded({extended:false}));




////////////////////////////////////////////
// Routes
////////////////////////////////////////////


app.get("/", (req, res) => {
  res.send("testing");
});


// INDEX ROUTE
app.get("/pokemon", (req, res) => {
//   res.send("testing")
    res.render("index", //index.Liquid
  {
    data: Pokemon, // data is liquid variable
  });
});

//NEW ROUTE
app.get("/pokemon/new", (req, res) => {
    res.render('new')
})


//Create route
//  create array, append each then push all / create three sections on form / could set it up where coma seperated then pops them into an array 
app.post("/pokemon", (req, res) => {

  //create new pokemon
  Pokemon.push(req.body)
  res.redirect('/pokemon')
})

//DELETE

//PUT
app.put("/pokemon/:index", (req, res) => {
 
  Pokemon[req.params.index] = req.body; //in our fruits array, find the index that is specified in the url (:indexOfFruitsArray).  Set that element to the value of req.body (the input data)
  res.redirect("/pokemon"); //redirect to the index page
});




// ID
app.get("/pokemon/:id", (req, res) => {
    res.render("show", {
        data: Pokemon[req.params.id]
    })
})







// PORT
app.listen(3002, () => {
  console.log("port 3002 is active");
});
