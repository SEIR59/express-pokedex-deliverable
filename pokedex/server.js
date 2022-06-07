const express = require('express')
const app = require("liquid-express-views")(express())
const Pokemon = require('./models/pokemon.js')
const methodOverride = require('method-override')
const rowdy = require('rowdy-logger')

const routesReport = rowdy.begin(app)

app.use(express.urlencoded({
    extended: false
}))

app.use(express.static('public'))

app.use(express.json())

app.use(methodOverride("_method"))

app.get('/', (req, res) => {
    res.send('Hello')
})


app.listen(3000, () => {
    console.log("listening on port 3000!")
    routesReport.print()
})