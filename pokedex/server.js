/*============================================================
        Dependencies 
============================================================*/
const expr = require("express")
const { redirect } = require("express/lib/response")
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
    
    res.render("pokemon/index",{
        allPokemon: arrPokemon            
    })
})

// "/pokemon/:id" GET - show TODO: Will display all of the information about a pokemon
app.get("/pokemon/:id", (req, res) => {
    let indPokemon = req.params.id
    res.render("pokemon/show",{
        pokemon: arrPokemon[indPokemon],
        index: indPokemon
    })
})

// "/pokemon/new" GET - new TODO: Add required info to create pokemon and push to array
app.get("/pokemon/new", (req, res) => {
    res.render("pokemon/new")
})

// "/pokemon/:id/edit" - GET TODO: Pull existing data form selected pokemon and display it in form, allowing to edit (all into/ some info "haven't decided yet") and then save changes. Adding bodyData to array[id] and render index via POST after.
app.get("/pokemon/:id/edit", (req, res) => {
    let indPokemon = req.params.id
    res.render("pokemon/edit",{
        pokemon: arrPokemon[indPokemon],
        index: indPokemon
    })
})

// "/pokemon" POST - index TODO: get index after adding pokemon from "/new" route

// /pokemon/:id UPDATE - redirect -> index after updating pokemon off of index TODO: get index but update array using index based off of "/edit"
app.put("/pokemon/:id/", (req,res) => {
    let pageData = req.body
    let indPokemon =  req.params.id
    // seperate the multi dot notation keys and values into their own arrays
    let arrKeys = Object.keys(pageData)
    let arrValues = Object.values(pageData)
    // loop through each key
    for (let i = 0; i < arrKeys.length; i++){
        // split the multi dot notaion arrays into their own array and use each value as a key to find the correct path.
        currentKey = arrKeys[i].split(".")
        arrPokemon[indPokemon][currentKey[0]][`${currentKey[1]}`] = arrValues[i]
    }
    res.redirect(`/pokemon/${indPokemon}`)
})
// /pokemon/:id DELETE - redirect -> index after splicing array off of index

/*============================================================
        Listener & Logger
============================================================*/
app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
    rowdyLogger.print()
})