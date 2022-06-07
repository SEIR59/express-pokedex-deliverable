const express = require('express')
const app = express()
const PORT = 3000

app.get('/' , (req,res)=>{
    res.redirect('/pokemon')
})

app.get('/pokemon',(req,res)=>{
    res.send('Pokedex Homepage')
})

app.get('/pokemon/:id',(req,res)=>{
    
})

app.get('/pokemon/new',(req,res)=>{
    
})

app.get('/pokemon/:id/edit',(req,res)=>{
    
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