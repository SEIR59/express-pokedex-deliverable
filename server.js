const express    = require('express');
const app        = require('liquid-express-views')(express())
const port = 2000
const Pokemon = require('./pokedex/pokemon');
const methodOverride = require('method-override')
const rowdy = require('rowdy-logger')
const routesReport = rowdy.begin(app)

//adding middleware

app.use((req, res, next) => {
  console.log('I run for all routes');
  next();
});

app.use(express.urlencoded({
  extended: false
})) // allows us to view body of a post request

app.use(express.static('public')); //tells express to try to match requests with files in the directory called 'public'

app.use(express.json()) // This prepares our api to receive json data from the body of all incoming requests.

//use method override 
app.use(methodOverride('_method'))



// INDEX
app.get('/pokemon', (req, res) => {

    res.render('index', { 
        data: Pokemon });
});

//NEW
app.get('/pokemon/new', (req, res) => {
  res.render('new')
})

//Post Route

app.post('/pokemon', (req, res) => {
  console.log("post route")
  Pokemon.push(req.body);
  
  res.redirect('/pokemon'); //send the user back to /index
});

// SHOW

app.get('/pokemon/:id', (req, res) => {
    
  res.render('show', {
    data: Pokemon[req.params.id]
  })

})

//Delete route

app.delete('/pokemon/:id', (req, res) => {
  Pokemon.splice(req.params.id, 1) // removes item from array
  res.redirect('/pokemon') //redirects back to index page
})

//edit route
app.get('/pokemon/:id/edit', (req, res) => {
  res.render(
      'edit',
      {
          data: Pokemon[req.params.id], 
          index: req.params.id
      })
      
})

app.put('/pokemon/:id', (req, res) => {
  
  Pokemon[req.params.id] = req.body
  console.log(req.body)
  res.redirect('/pokemon')
})

//Listener
app.listen(port, (req, res) => {
    console.log('We are live from 2000, the pokemon center')
    routesReport.print()
})

