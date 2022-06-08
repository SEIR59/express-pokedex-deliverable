// Dependencies
require('dotenv').config();
const express = require('express');
const morgan = require('morgan'); //import morgan
const Pokemon = require('./models/pokemon.js');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const path = require('path');
const app = require('liquid-express-views')(express());
	

////////////////////////////////////////////
// Database Connection
/////////////////////////////////////////////
// Setup inputs for our connect function
const DATABASE_URL = process.env.DATABASE_URL;
const CONFIG = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
};

// Establish Connection
// mongoose.connect(DATABASE_URL, CONFIG);

// Events for when connection opens/disconnects/errors
// mongoose.connection
// 	.on('open', () => console.log('Connected to Mongoose'))
// 	.on('close', () => console.log('Disconnected from Mongoose'))
// 	.on('error', (error) => console.log(error));

// Middleware
app.use(morgan('tiny')); //logging
app.use(methodOverride('_method')); // override for put and delete requests from forms
app.use(express.urlencoded({ extended: true })); // parse urlencoded request bodies
app.use(express.static('public')); // serve files from public statically


// INDEX **(const data = Pokemon)**
app.get('/pokemon', (req, res) => {
    res.render('index',
        { data: Pokemon });
});

// Render new page when creating pokemon
app.get('/pokemon/new', (req, res) => {
	res.render('new');
});

app.post('/pokemon', (req, res) => {
	Pokemon.unshift({
		name: req.body.name,
		img: req.body.img,
		type: req.body.type,
		stats: {
			hp: req.body.hp,
			attack: req.body.attack,
			defense: req.body.defense,
		},
	});
	res.redirect('/pokemon');
});

// render edit page when changing existing pokemon
app.get('/pokemon/:id/edit', (req, res) => {
    res.render(
        'edit',
        {
            data: Pokemon[req.params.id],
            index: req.params.id
        })
   
});



//   DELETE ROUTE
app.delete('/pokemon/:id', (req, res) => {
	// console.log('delete this');
	Pokemon.splice(req.params.id, 1);
	res.redirect('/pokemon');
});

 
// ADD NEW POKEMON


// UPDATE EXISTING ROUTE
app.put('/pokemon/:id', (req, res) => {
    let poke = Pokemon[req.params.id]
     poke.name = req.body.name;
     poke.img = req.body.img;
     poke.type = req.body.type;
     poke.hp = req.body.hp;
     poke.attack = req.body.attack;
     poke.defense = req.body.defense;
     console.log(poke.hp)
     res.redirect('/pokemon')
 })

// SHOW ROUTE (renders show page for each index in the array(*database*) 0,1,2 etc.)
app.get('/pokemon/:id', (req, res) => {
    res.render('show',
        {
            data: Pokemon[req.params.id],
            index: req.params.id
        })
});

// Port listening
app.listen(3500, () => {
	console.log('listening on port 3500!');
});
