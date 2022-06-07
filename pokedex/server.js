const express = require('express')
const app = require("liquid-express-views")(express())
const Pokemon = require('./models/pokemon.js')
const methodOverride = require('method-override')
const rowdy = require('rowdy-logger')


app.listen(3000, () => {
    console.log("listening on port 3000!")
    //routesReport.print()
})