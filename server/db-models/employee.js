/***
** Title: employee.js
** Author: Wendy Leon
** Date: March 18 2021
** Description: API - findEmployeeById
 ***/
// mongoose library import
const mongoose = require('mongoose');
const Item = require('./item');

//create schema with emp type - maps to MongoDB collection
let employeeSchema = mongoose.Schema({
  empId: { type: String, unique: true },
  todo: [Item],
  done: [Item]
},
{ collection: "employees"} );

// schema passed to api - assigned to employee model
module.exports = mongoose.model("Employee", employeeSchema);


