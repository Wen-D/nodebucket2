/***
** Title: employee.js
** Author: Wendy Leon
** Date: March 18 2021
** Description: API - findEmployeeById
 ***/
//import mongoose library
const mongoose = require ('mongoose');

//create schema with emp type - maps to MongoDB collection
let employeeSchema = mongoose.Schema({
  empId: { type: String, unique: true }},
{ collection: "employees"} );

//passing schema to api - assigned to employee model
module.exports = mongoose.model("Employee", employeeSchema);


