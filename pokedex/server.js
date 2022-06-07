const express = require('express')
const app = require('liquid-express-views')(express())
const PORT = 3000
const pokemonList = require('./pokemon.js')

app.use(express.urlencoded({extended:false}));
app.use(express.static('public')); //tells express to try to match requests with files in the directory called 'public'

app.get('/' , (req,res)=>{
    res.redirect('/pokemon')
})

app.get('/pokemon',(req,res)=>{
    res.render('pokemonLiquid/index',{
        pokemonList: pokemonList
    })})

    app.get('/pokemon/new',(req,res)=>{
        res.render('pokemonLiquid/new' )
    })

app.get('/pokemon/:id',(req,res)=>{
    res.render('pokemonLiquid/show')
})

app.get('/pokemon/:id/edit',(req,res)=>{
    res.render('pokemonLiquid/edit')
})

app.post('/pokemon',(req,res)=>{
    
})

app.post('/pokemon/:id',(req,res)=>{
    
})

app.delete('/pokemon/:id',(req,res)=>{
    
})








app.listen(PORT , ()=>{
    console.log('Listening to port')
})