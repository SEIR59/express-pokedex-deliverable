const express = require('express');
const rowdy = require('rowdy-logger');
const morgan = require('morgan');
const app = require('liquid-express-views')(express());
const routesReport = rowdy.begin(app);
const methodOverride = require('method-override');
const Pokemon = require('./models/pokemon');
const port = 5000;


// MIDDLEWARES
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(methodOverride('_method'));
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());





app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    routesReport.print();
  });