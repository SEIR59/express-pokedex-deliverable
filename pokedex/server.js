/*============================================================
        Dependencies 
============================================================*/
const expr = require("express")
const app = require("liquid-express-views")(expr())
const methodOverride = require("method-override")

const port = 3000
const rowdy = require("rowdy-logger")
const rowdyLogger = rowdy.begin(app)

app.use((req, res, next) => {
    console.log("I run on all routes!")
    next()
})
app.use(expr.urlencoded({extended: fales})) // allows the use of data from the body of the page
app.use(expr.static("public")) // sets the default folder to search when selecting folders.
app.use(methodOverride("_method")) // set up method for methodOverride

/*============================================================
        Routes
============================================================*/

// "/pokemon GET" - index TODO: Add basic layout forloop, add button for edit and delete

// "/pokemon/:id GET" - show TODO: Will display all of the information about a pokemon

// "/pokemon/new GET" - new TODO: Add required info to create pokemon and push to array

// "/pokemon/:id/edit" - edit TODO: Pull existing data form selected pokemon and display it in form, allowing to edit (all into/ some info "haven't decided yet") and then save changes. Adding bodyData to array[id] and render index via POST after.

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