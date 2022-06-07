const express = require("express");
const app = require("liquid-express-views")(express());
const methodOverride = require("method-override");
const Pokemon = require("../models/pokemon.js");
const routesReport = rowdy.begin(app);
const port = 3000

// middleware
// allows us to view body of a post request
// allow us to access data that posting. Can be use add, edit, put, etc. i.e. allow developers use more than just get and post route
app.use(
  express.urlencoded({
    extended: false,
  })
);
// tells express to try to match requests with files in the directory called 'public'
app.use(express.static("public"));
// This prepares our api to receive json data from the body of all incoming requests.
// Do we need this line?
app.use(express.json());

// positioning: as long as it aheads of the route, we will be fine
app.use(methodOverride("_method"));

// INDEX
app.get('/', (req, res) => {
    res.render(
        'index',
        {
            data: Pokemon
        }
    )
})

// SHOW
app.get('/:id', (req, res) => {
    res.render(
        'show',
        {
            data: Pokemon[req.params.id]
        }
    )
})

app.listen(port, () => {
    console.log('port 3000 listens')
    routesReport.print()
})
