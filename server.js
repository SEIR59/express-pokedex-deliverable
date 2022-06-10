const express = require('express')
const { redirect } = require('express/lib/response')
const res = require('express/lib/response')
const app = require('liquid-express-views')(express())
const pokedex = require('./models/pokemon.js')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
const port = 3000

app.listen(port, () => {
	console.log(`Listening on port ${port}!!`)
})

app.get('/pokemon', (req, res) => {

})

app.get('/pokemon/:id', (req, res) => {
    
})