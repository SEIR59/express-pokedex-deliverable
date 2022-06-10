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

//index route
app.get('/pokemon', (req, res) => {
	res.render('index', {
		allPokemon: pokedex,
	})
})

//show route
app.get('/pokemon/:id', (req,res) => {

})

//new route
app.get('/pokemon/new', (req, res) => {

})

//edit route
app.get('/pokemon/:id/edit', (req, res) => {

})

//create route
app.post('/pokemon', (req, res) => {

})

//update route
app.put('/pokemon/:id', (req, res) => {

})

//destroy route
app.delete('/pokemon/:id', (req, res) => {

})