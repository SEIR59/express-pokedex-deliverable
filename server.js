const express = require('express')
const { redirect } = require('express/lib/response')
const res = require('express/lib/response')
const app = require('liquid-express-views')(express())
const pokedex = require('./models/pokemon.js')
const methodOverride = require('method-override')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(methodOverride('_method'))
const port = 3100

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

//edit route
app.get('/pokemon/:id/edit', (req, res) => {
	res.render('edit', {
		singlePokemon: pokedex[req.params.id],
		index: req.params.id,
	})
})

//show route
app.get('/pokemon/:id', (req, res) => {
	res.render('show', {
		singlePokemon: pokedex[req.params.id],
	})
})

//create route
app.post('/pokemon', (req, res) => {
	let newPokemon = {
		name: req.body.name,
		img: req.body.img,
		type: req.body.type,
		speed: req.body.speed,
		stats: {
			hp: req.body.hp,
			attack: req.body.attack,
			defense: req.body.defense,
			spattack: req.body.spattack,
			spdefense: req.body.spdefense,
		},
		damages: {
			normal: req.body.normal,
			fire: req.body.fire,
			water: req.body.water,
			electric: req.body.electric,
			grass: req.body.grass,
			ice: req.body.ice,
			fight: req.body.fight,
			poison: req.body.poison,
			ground: req.body.ground,
			flying: req.body.flying,
			psychic: req.body.psychic,
			bug: req.body.bug,
			rock: req.body.rock,
			ghost: req.body.ghost,
			dragon: req.body.dragon,
			dark: req.body.dark,
			steel: req.body.steel,
		},
	}
	pokedex.push(newPokemon)
	res.redirect('/pokemon')
})

//update route
app.put('/pokemon/:id', (req, res) => {
	console.log('request,body', req.body)

	pokedex[req.params.id].name = req.body.name
	pokedex[req.params.id].img = req.body.img
	pokedex[req.params.id].type = req.body.type
	pokedex[req.params.id].speed = req.body.speed

	pokedex[req.params.id].stats.hp = req.body.hp
	pokedex[req.params.id].stats.attack = req.body.attack
	pokedex[req.params.id].stats.defense = req.body.defense
	pokedex[req.params.id].stats.spattack = req.body.spattack
	pokedex[req.params.id].stats.spdefense = req.body.spdefense

	pokedex[req.params.id].damages.normal = req.body.normal
	pokedex[req.params.id].damages.fire = req.body.fire
	pokedex[req.params.id].damages.water = req.body.water
	pokedex[req.params.id].damages.electric = req.body.electric
	pokedex[req.params.id].damages.grass = req.body.grass
	pokedex[req.params.id].damages.ice = req.body.ice
	pokedex[req.params.id].damages.fight = req.body.fight
	pokedex[req.params.id].damages.poison = req.body.poison
	pokedex[req.params.id].damages.ground = req.body.ground
	pokedex[req.params.id].damages.flying = req.body.flying
	pokedex[req.params.id].damages.psychic = req.body.psychic
	pokedex[req.params.id].damages.bug = req.body.bug
	pokedex[req.params.id].damages.rock = req.body.rock
	pokedex[req.params.id].damages.ghost = req.body.ghost
	pokedex[req.params.id].damages.dragon = req.body.dragon
	pokedex[req.params.id].damages.dark = req.body.dark
	pokedex[req.params.id].damages.steel = req.body.steel

	res.redirect('/pokemon')
})

//destroy route
app.delete('/pokemon/:id', (req, res) => {
	pokedex.splice(req.params.id, 1)
	res.redirect('/pokemon')
})