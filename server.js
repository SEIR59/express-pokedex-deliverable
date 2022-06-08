const express = require('express')
const app = require('liquid-express-views')(express())
const methodOverride = require('method-override')
const Pokemon = require("./models/pokemon")

const port = 3000



app.use(express.urlencoded({extended:false}));
app.use(methodOverride("_method"));


// index 
app.get('/', (req, res)=> {
    res.send('index')
})

// //delete
// app.delete("/pokemon/:id", (req, res) => {
//     pokedex.splice(req.params.id, 1);
//     res.redirect("/pokemon");

//   });


//   //new

// app.get('/pokemon/new', (req,res) => {
//     res.render('new')
// })

// app.post('/pokemon', (req, res)=>{
//     pokedex.push(req.body);
//     res.redirect('/pokemon');
// })




// //Edit route

// app.get("/pokemon/:id/edit", (req, res) => {
//     res.render(
//       "edit", 
//       {
    
//         pokemon: pokedex[req.params.id],
//         index: req.params.id,
//       }
//     );
//   });

//   //Update index

//   app.put("/pokemon/:id/", (req, res) => {

//     pokedex[req.params.id] = req.body;
//     res.redirect("/pokemon");
//     console.log(pokedex[2])
//   });

// //show

// app.get('/pokemon/:id', (req, res) => {
//     res.render('show', {pokemon: pokedex[req.params.id]})
// })

app.listen(3000, () => {
  console.log('listening to port 3000')
})
