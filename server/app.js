/***
** Title: app.js
** Author: Wendy Leon
** Date: March 18 2021
** Description: API - findEmployeeById Sprint 1
 ***/
/**
 * Require statements
 */
const express = require('express');
const http = require('http');
const morgan = require('morgan');
///////////////////const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
// const emp model access schema
//const Employee = require ('./db-models/employee'); no longer needed because of API

const EmployeeApi = require('./routes/employee-route'); // employee API - import


/**
 * App configurations
 */
let app = express();
app.use(express.json());
app.use(express.urlencoded({'extended': true}));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../dist/nodebucket')));
app.use('/', express.static(path.join(__dirname, '../dist/nodebucket')));

/**
 * Variables
 */
 const port = process.env.PORT || 3000; // server port

// mongo connection to db string
const conn = 'mongodb+srv://nodebucket_user:admin@buwebdev-cluster-1.oqsoi.mongodb.net/nodebucket?retryWrites=true&w=majority';

/**
 * Database connection
 */
mongoose.connect(conn, {
  promiseLibrary: require('bluebird'),
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
}).then(() => {
  console.debug(`Connection to the database instance was successful`);
}).catch(err => {
  console.log(`MongoDB Error: ${err.message}`)
}); // end mongoose connection

/**
 * API(s) go here...
 */
 app.use('/api/employees', EmployeeApi);


/**
 * Create and start server
 */
 http.createServer(app).listen(port, function() {
  console.log(`Application started and listening on port: ${port}`)
}); // end http create server function
