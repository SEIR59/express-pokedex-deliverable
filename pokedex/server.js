const express = require('express');
const app = require('liquid-express-views')(express())
const PORT = 3000
const pokemonList = require('./pokemon.js')

app.use(express.urlencoded({extended:true}));
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
    res.render('pokemonLiquid/show', {
        pokemon: pokemonList[req.params.id],
        id:req.params.id
    })
})

app.get('/pokemon/:id/edit',(req,res)=>{
    
    res.render('pokemonLiquid/edit',{
        pokemon:pokemonList[req.params.id],
        id:req.params.id,
    })
})

app.post('/pokemon',(req,res)=>{
    let p = {}
    let r = req.body
    console.log(r)
    p.stats={}
    p.name=r.name
    p.img=r.img
    p.type=r.type.split(', ')
    p.stats.hp=r.hp
    p.stats.attack=r.attack
    p.stats.defense=r.defense
    pokemonList.push(p)
    res.redirect('/pokemon')
})

app.post('/pokemon/:id' ,(req,res)=>{
    let p = pokemonList[req.params.id]
    let r = req.body
    console.log(r)
    p.name=r.name
    p.img=r.img
    p.type=r.type.split(', ')
    p.stats.hp=r.hp
    p.stats.attack=r.attack
    p.stats.defense=r.defense
    p.stats.speed=r.speed
    res.redirect(`/pokemon/${req.params.id}`)
})

app.delete('/pokemon/:id',(req,res)=>{
    
})








app.listen(PORT , ()=>{
    console.log('Listening to port')
})