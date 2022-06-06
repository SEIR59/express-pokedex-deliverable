/*============================================================
        Dependencies 
============================================================*/
const expr = require("express")
const app = require("liquid-express-views")(expr())
const methodOverride = require("method-override")

const port = 3000
const rowdy = require("rowdy-logger") // set up rowdy-logger
const rowdyLogger = rowdy.begin(app)

const arrPokemon = require("./models/pokemon.js") // get array of pokemon and store in variable

app.use((req, res, next) => {
    console.log("I run on all routes!")
    next()
})
app.use(expr.urlencoded({extended: false})) // allows the use of data from the body of the page
app.use(expr.static("public")) // sets the default folder to search when selecting folders.
app.use(expr.json()) // get up so we can get json data from body
app.use(methodOverride("_method")) // set up method for methodOverride

/*============================================================
        Routes
============================================================*/

// "/pokemon" GET - index TODO: Add basic layout forloop, add button for edit and delete
app.get("/pokemon", (req, res) => {
    
    res.render("index",{
        allPokemon: arrPokemon            
    })
})

// "/pokemon/:id" GET - show TODO: Will display all of the information about a pokemon
app.get("/pokemon/:id", (req, res) => {
    let indPokemon = req.params.id
    res.render("show",{
        allPokemon: arrPokemon[indPokemon]
    })
})

// "/pokemon/new" GET - new TODO: Add required info to create pokemon and push to array
app.get("/pokemon/new", (req, res) => {
    res.render("new")
})

// "/pokemon/:id/edit" - GET TODO: Pull existing data form selected pokemon and display it in form, allowing to edit (all into/ some info "haven't decided yet") and then save changes. Adding bodyData to array[id] and render index via POST after.
app.get("/pokemon/:id/edit", (req, res) => {
    let indPokemon = req.params.id
    res.render("edit",{
        allPokemon: arrPokemon[indPokemon]
    })
})

// "/pokemon" POST - index TODO: get index after adding pokemon from "/new" route

// /pokemon/:id UPDATE - redirect -> index after updating pokemon off of index TODO: get index but update array using index based off of "/edit"

// /pokemon/:id DELETE - redirect -> index after splicing array off of index

/*============================================================
        Listener & Logger
============================================================*/
app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
    rowdyLogger.print()
})