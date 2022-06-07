const express    = require('express');
const app = require('liquid-express-views')(express());
const Pokemon = require('./models/pokemon.js');
const methodOverride = require('method-override')
const rowdy = require('rowdy-logger')
const routeReport = rowdy.begin(app)
const port = 3000

// Middleware
app.use(methodOverride("_method")); // override for put and delete requests from forms
app.use(express.urlencoded({ extended: true })); // parse urlencoded request bodies
app.use(express.static("public")); // serve files from public statically

// Homepage
app.get('/', (req,res) => {
    res.send('working')
})

// INDEX
app.get('/pokemon', (req, res) => {
res.render('index.liquid', { data: Pokemon });
});

// SHOW
app.get('/:id', (req, res) => {
res.render('show.liquid', { data: Pokemon[req.params.id] });
});

app.listen(port, () => {
    console.log("working")
    routeReport.print()
})