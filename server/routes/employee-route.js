/***
** Title: employee.js
** Author: Wendy Leon
** Date: March 18 2021
** Description: API - findEmployeeById
 ***/
const express = require('express');

const router = express.Router(); // defines routing variables
const Employee = require ('../db-models/employee');
const BaseResponse = require('../service/base-response');

//http://localhost:3000/api/employees/empId

/***
 *
 *  API: findEmployeeById
 *  @param empId
 *  @returns Employee document or null
 *
 ***/


 router.get('/:empId', async(req, res) => {

  try
  {

     /* Use employee model and query MongoDB using empId */
     Employee.findOne({'empId': req.params.empId}, function(err, employee) {

      // If there is a database error, return a server 500 error

      if (err)
      {
        console.log(err);

        const mongoDBErrorResponse = new BaseResponse('500', `MongoDB native Error: ${err}`, null );

        res.json(mongoDBErrorResponse.toObject());
      }
      else
      {
        console.log(employee);
        const employeeResponse = new BaseResponse('200', 'Successful query', employee);
        res.json(employeeResponse.toObject());

      }
    })
  }
  catch (e) {  //Catch any unexpected errors
    console.log(e);

    const findEmployeeCatchError = new BaseResponse('500', `Internal Server Error: ${e.message}`, null );
    res.json(findEmployeeCatchError.toObject());
  }

})

module.exports = router;
