const express = require('express');
const app = require("liquid-express-views")(express());
const Pokemon = require('./pokemon');

const port = 3000;

app.use((req, res, next) => {
    console.log('I run for all routes');
    next();
});

app.use(express.urlencoded({extended:false}));


app.get('/pokemon', (req, res) =>{
    
});



app.listen(port, () => {
    console.log('listening');
});