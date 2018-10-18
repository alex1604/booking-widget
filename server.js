const express = require('express')
const dev = process.env.NODE_ENV !== 'production'
const server = express();
const path = require('path');
//const fs = require('fs');
const http = require('http');
const bodyParser = require('body-parser');
var jsonParser = bodyParser.text(); // convert the request body object to a javascript object

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

/* next: generateData function
takes a Number parameter to
specify number of mock products
to add to database: */

const generateData = require('./mockData').generateData;

server.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET")
    res.header("Access-Control-Allow-Headers", "Origin, Access-Control-Allow-Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const port = 3000;
server.listen(port, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:' + port)
})
