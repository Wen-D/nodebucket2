/***
** Title: employee.js
** Author: Wendy Leon
** Date: March 18 2021
** Description: API - findEmployeeById
 ***/

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let itemSchema = new Schema ({
  text: { type: String }
});

module.exports = itemSchema;
