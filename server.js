const express = require('express');
const app = require('liquid-express-views')(express())
const port = 3000
const Pokemon = require('./models/pokedex/pokemon.js')
const methodOverride = require('method-override')
const rowdy = require('rowdy-logger')
const routesReport = rowdy.begin(app)


// MIDDLEWARE
app.use((req, res, next) => {
    console.log('I am the middleware')
    next()
})

app.use(express.urlencoded( { extended: false }))

app.use(express.static('public'))

app.use(methodOverride('_method'))

// ***** MAKE IT SO THAT X AMOUNT OF POKEMON DISPLAYED AT A TIME ******
// INDEX
app.get('/pokemon', (req, res) => {
    res.render('index', { 
        allPokemon: Pokemon 
    })
})

// NEW
app.get('/pokemon/new', (req, res) => {
    res.render('new')
})

// UPDATE
app.put('/pokemon/:id', (req, res) => {
    name = req.body.name
    type = req.body.type
    
    res.redirect('/pokemon')
})

// POST
app.post('/Pokemon', (req, res) => {
    req.body.img = 'https://images.cults3d.com/gNmCucguF_950khaXUHO3dVUZLM=/516x516/https://files.cults3d.com/uploaders/19933232/illustration-file/58d154fb-ebc1-4f8b-bd76-a53f7c5c1ef5/2022_01_17_00_12_48_Pok%C3%A9ball_normal.pdf_et_1_page_suppl%C3%A9mentaire_Personnel_Microsoft_Edge.png'
    Pokemon.push(req.body)
    res.redirect('/Pokemon')
})

// ***** EDITING THE NAME RIGHT NOW EDITS EVERY OTHER ASPECT OF POKEMON TO EMPTY STRING ******
// EDIT
app.get('/pokemon/:id/edit', (req, res) => [
    res.render('edit', {
        Pokemon: Pokemon[req.params.id],
        index: req.params.id
    })
])

// DELETE
app.delete('/pokemon/:id', (req, res) => {
    Pokemon.splice(req.params.id, 1)
    res.redirect('/pokemon')
})


// SHOW
app.get('/pokemon/:id', (req, res) => {
    res.render('show', { 
        Pokemon: Pokemon[req.params.id],
        index: req.params.id
    })
})

// LISTEN
app.listen(port, () => {
    console.log('Listening on port 3000')
    routesReport.print()
})