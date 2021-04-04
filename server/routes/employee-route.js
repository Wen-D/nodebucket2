/***
** Title: employee.js
** Author: Wendy Leon
** Date: March 18 2021
** Description: API - findEmployeeById
 ***/
const express = require('express');

const router = express.Router(); // defines routing variables
const Employee = require("../db-models/employee");
const BaseResponse = require('../service/base-response');

//http://localhost:3000/api/employees/empId

/***
 *
 *  API: findEmployeeById ***********
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
    } )
  }
  catch (e) {  //Catch any unexpected errors
    console.log(e);

    const findEmployeeCatchError = new BaseResponse('500', `Internal Server Error: ${e.message}`, null );

    res.json(findEmployeeCatchError.toObject());
}
})


/**
 * API: createTask
 * Post request to insert task in employee collection,
 * task arrays.
 */
 router.post('/:empId/tasks', async(req, res) => {
  console.log(req.params.empId);
  try {
      // find emp id
      Employee.findOne({'empId': req.params.empId}, function(err, employee) {


          if (err)
          {

              console.log(err)

              const createTaskMongoDbError = new BaseResponse('500', `MongoDB Exception: ${err.message}`, null)

              res.status(500).send(createTaskMongoDbError.toObject());

          } else {
              console.log(' Inside else statement of create task ');
              console.log(employee);

              if (employee)
              {

                const item =
                {
                  text: req.body.text
                };

                employee.todo.push(item);

                employee.save(function(err, updatedEmployee)
                {

                  if (err)
                  {

                    console.log(err);

                    const createTaskOnSaveMongoDbError = new BaseResponse('500', `MongoDB onSave() exception: ${err.message}`, null)

                    res.status(500).send(createTaskOnSaveMongoDbError.toObject());
                  }
                  else
                  {
                    console.log(' Inside update task task ');
                    console.log(updatedEmployee);

                    const createTaskOnSaveSuccessResponse = new BaseResponse('200', 'Successful query', updatedEmployee);

                    res.status(200).send(createTaskOnSaveSuccessResponse.toObject());
                  }
                })
              }
              else
              {
                console.log('Invalid employeeId');
                const invalidEmployeeIdResponse = new BaseResponse ('200', 'Invalid Employee Id', null );
                res.status(200).send(invalidEmployeeIdResponse.toObject());
              }

          }
      })
  // error catch - server not available
  } catch (e) {
      console.log(e);

      const createTaskCatchException = new BaseResponse('500', `Internal Server Error: ${e.message}`, null)

      res.json(createTaskCatchException.toObject());
  }
})

/***
** API: findAllTasks ***
**/

// get tasks from an emp
router.get('/:empId/tasks', async(req, res) => {
  try
  {
    // find emp
    Employee.findOne({'empId': req.params.empId}, 'empId todo done', function(err, employee) {

      if(err) // server error
      {
        console.log(err)

        const mongoDBFindAllTasksException = new BaseResponse ('500', `Internal server error ${err.message}`, null);
        res.status(500).send(mongoDBFindAllTasksException.toObject());
      }

      // if no error - success msg
      else {
        console.log(employee)

        const employeeTaskResponse = new BaseResponse('200', 'Query successful', employee);
        res.status(200).send(employeeTaskResponse.toObject());
      }

    })
  }
  catch (e)
  {

    console.log(e)

    const errorCatchResponse = new BaseResponse('500', `Internal server error ${e.message}`, null);
    res.status(500).send(errorCatchResponse.toObject());
  }
})

/***
*** API: updateTask ******
***/

 router.put('/:empId/tasks', async(req, res) => {

  try
  {

    // find matching employeeID
    Employee.findOne({'empId': req.params.empId}, function(err, employee) {

      // if an error occurs
      if (err)
      {
        //log error to console
        console.log(err);
        //server error
        const updateTaskMongodbException = new BaseResponse('500', `Internal server error ${err.message}`, null );
        res.status(500).send(updateTaskMongodbException.toObject());

      }
      else
      {
        console.log(employee);

        // there is a match to emp id

        if (employee)
        {
            // create task arrays

            employee.set({

            todo: req.body.todo,
            done: req.body.done

          });

          employee.save(function(err, updatedEmployee) {

            if (err)
            {
              console.log(err);

              // if server error
              const updateTaskMongoDbError = new BaseResponse('500', `Internal server error ${err.message}`, null);
              res.status(500).send(updateTaskMongoDbError.toObject());
            }

            // if no error update task
            else
            {
              console.log(updatedEmployee);

              // success message - task upadated
              const updatedTaskSuccessResponse = new BaseResponse('200', 'Query Successful', updatedEmployee);

              res.status(200).send(updatedTaskSuccessResponse.toObject());
            }
          })
        }

        // if id is invalid display 200 message
        else {

          console.log(`Invalid employee Id: the passed-in value was ${req.params.empId}`);

          const invalidEmployeeIdResponse = new BaseResponse('200', 'Invalid employee ID', null);
          res.status(200).send(invalidEmployeeIdResponse.toObject());
        }
      }
    })
  }

  catch(e)
  {
    console.log(e);

    const updateTaskCatchResponse = new BaseResponse('500', `Internal server error ${e.message}`, null);
    res.status(500).send(updateTaskCatchResponse.toObject());
  }
})


/****
*** API: deleteTask ****
*****/

 router.delete('/:empId/tasks/:taskId', async(req, res) => {

  try
  {
    // find employee record
    Employee.findOne({'empId': req.params.empId}, function(err, employee) {

      // if empid not found
      if (err)
      {
        console.log(err);

        const deleteTaskMongoDbError = new BaseResponse('500', `Internal server error ${err.message}`, null);
        res.status(500).send(deleteTaskMongoDbError.toObject());
      }
      // if empid found
      else
      {
        console.log(employee);

        // assign found id to var - to do or done arrays

        const todoItem = employee.todo.find(item => item._id.toString() === req.params.taskId);
        const doneItem = employee.done.find(item => item._id.toString() === req.params.taskId);

        // if todo item
        if (todoItem)
        {

          console.log(todoItem);
          //delete task
          employee.todo.id(todoItem._id).remove();
          employee.save(function(err, updatedTodoItemEmployee) {

            // if not found
            if (err)
            {
              console.log(err);
              // internal server error
              const deleteTodoItemMongodbError = new BaseResponse('500', `Internal server error ${err.message}`, null);
              res.status(500).send(deleteTodoItemMongodbError.toObject());
            }

            // if found, remove from the array
            else{
              console.log(updatedTodoItemEmployee);
              const deleteTodoItemSuccess = new BaseResponse('200', 'Query Successful', updatedTodoItemEmployee);
              res.status(200).send(deleteTodoItemSuccess.toObject());
            }
          })

          // if done time found
        } else if (doneItem) {
          console.log(doneItem);
          employee.done.id(doneItem._id).remove();
          employee.save(function(err, updatedDoneItemEmployee) {

            // if error
            if (err)
            {
              console.log(err);
              // 500 error
              const deleteDoneItemMongodbError = new BaseResponse('500', `Invalid server error ${err.message}`, null);
              res.status(500).send(deleteDoneItemMongodbError.toObject());
            }

            // else delete task
            else
            {
              console.log(updatedDoneItemEmployee);
              const deleteDoneItemSuccess = new BaseResponse('200', 'Query successful', updatedDoneItemEmployee);
              res.status(200).send(updatedDoneItemEmployee.toObject());
            }
          })
        }

        // if todo and done not found - 200 error
        else
        {
          console.log(`Invalid task ID: passed-in value ${req.params.taskId}`)
          const invalidTaskIdResponse = new BaseResponse('200', 'Invalid task ID', null);
          res.status(200).send(invalidTaskIdResponse.toObject());
        }
      }
    })

  }
  // if empid not found - 500 error
  catch (e)
  {
    console.log(e);

    const deleteTaskCatchError = new BaseResponse('500', `Internal server error ${e.message}`, null);
    res.status(500).send(deleteTaskCatchError.toObject());
  }
 })


module.exports = router;
