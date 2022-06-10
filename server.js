const express = require('express')
const { redirect } = require('express/lib/response')
const res = require('express/lib/response')
const app = require('liquid-express-views')(express())
const pokedex = require('./models/pokemon.js')
const methodOverride = require('method-override');
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(methodOverride('_method'))
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

//new route
app.get('/pokemon/new', (req, res) => {
    res.render('new.liquid')
})

//show route
app.get('/pokemon/:id', (req,res) => {
    res.render('show', {
		singlePokemon: pokedex[req.params.id],
	}) 
})

//edit route
app.get('/pokemon/:id/edit', (req, res) => {

})

//create route
app.post('/pokemon', (req, res) => {
    pokedex.push(req.body)
    res.redirect('/pokemon')
})

//update route
app.put('/pokemon/:id', (req, res) => {

})

//destroy route
app.delete('/pokemon/:id', (req, res) => {
    pokedex.splice(req.params.id, 1)
	res.redirect('/pokemon')
})