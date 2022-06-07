const express = require("express");
const app = require("liquid-express-views")(express());
const Pokemon = require("./pokedex/pokemon.js");


//how we are connecting our css page
app.use(express.static('public')); //tells express to try to match requests with files in the directory called 'public'


//near the top, around other app.use() calls
app.use(express.urlencoded({extended:false}));








app.get("/", (req, res) => {
  res.send("testing");
});


// INDEX
app.get("/pokemon", (req, res) => {
//   res.send("testing")
    res.render("index", //index.Liquid
  {
    data: Pokemon, // data is liquid variable
  });
});

app.get("/pokemon/new", (req, res) => {
    res.render('new')
})


app.get("/pokemon/:id", (req, res) => {
    res.render("show", {
        data: Pokemon[req.params.id]
    })
})




//Create route
//  create array, append each then push all / create three sections on form / could set it up where coma seperated then pops them into an array 



// PORT
app.listen(3002, () => {
  console.log("port 3002 is active");
});
