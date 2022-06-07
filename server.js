const express = require('express')
const app = require('liquid-express-views')(express())
let Pokemon = require('./pokedex/pokemon')
const methodOverride = require('method-override')

app.use(express.urlencoded({
    extended: false
}))

app.use(methodOverride('_method'))


// INDEX
app.get('/pokemon', (req, res) => {
    console.log('you hit the index route')
    res.render('index', { data: Pokemon });
    });
// New    
app.get('/pokemon/new', (req, res) => {
    console.log('you hit the new route')
    res.render('new')
    })


// SHOW
app.get('/pokemon/:id', (req, res) => {
    console.log('you hit the show route')
    res.render('show', { data: Pokemon[req.params.id] });
    });
// EDIT
app.get('/pokemon/:id/edit', (req,res) => {
    console.log('You hit the edit route ')
    res.render('edit',
    {

    })
})

//POST
app.post('/pokemon', (req, res) => {
    console.log('This is the post route')
})

//PUT
app.put('pokemon/:id',(req, res) => {
    console.log('put route hit')
})

// DELETE
app.delete('/pokemon/:id', (req, res) => {
    console.log('delete route hit')
})

app.listen(3000, () => {
    console.log('port 3000 on')
})