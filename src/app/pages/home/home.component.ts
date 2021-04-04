/***
*
** Title: login component
** Author: Wendy Leon
** Date: April 2 2021
** Description: API - findEmployeeById
*
****/

import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Employee } from 'src/app/shared/employee.interface';
import { item } from 'src/app/shared/item.interface';

import { CreateTaskDialogComponent } from 'src/app/shared/create-task-dialog/create-task-dialog.component';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { TaskService } from 'src/app/shared/task.service';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  // array of existing items
  todo: item[];
  done: item[];
  employee: Employee;

  empId: string;


  constructor(private taskService: TaskService, private cookieService: CookieService, private dialog: MatDialog) {
    this.empId = this.cookieService.get('session_user');

    this.taskService.findAllTasks(this.empId).subscribe(res => {
      console.log('-- Service response from findAllTasks -- ');
      console.log(res);

      // employee object
      this.employee = res.data;
      console.log('-- Employee Object --');
      console.log(this.employee);

    },

    // error message handler
    err => {
      console.log(err);
    },
    () => {

      // on complete
      this.todo = this.employee.todo;
      this.done = this.employee.done;

      console.log('-- This is inside the complete todo section --');
      console.log(this.todo);
      console.log('-- This is inside the complete done section --');
      console.log(this.done);
    })
   }

  ngOnInit(): void {
  }

  /***
   * when dialog is open, this wont close by clicking outside dialog area
  ***/

  openCreateTaskDialog() {
    const dialogRef = this.dialog.open(CreateTaskDialogComponent, {
      disableClose: true
    })

    dialogRef.afterClosed().subscribe(data => {
      if (data)
      {
        this.taskService.createTask(this.empId, data.text).subscribe(res => {
          this.employee = res.data;
        },

        // handler for error message
        err => {
          console.log(err);
        },
        () => {
          this.todo = this.employee.todo;
          this.done = this.employee.done;
        })
      }
    })
  }

  /**
   *
   * @param event
  **/

  drop(event: CdkDragDrop<any[]>) {

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      console.log('-- Reordered item in an existing column --');
      this.updateTaskList(this.empId, this.todo, this.done);
    }

    else
    {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex)
      console.log('-- Move task item to a different column --');
      this.updateTaskList(this.empId, this.todo, this.done);
    }
  }

  /**
   *
   * @param taskId
   * Function to delete a task
  **/

  deleteTask(taskId: string): void {
    if (taskId)
    {
      console.log(`Task item ${taskId} was deleted`);
      this.taskService.deleteTask(this.empId, taskId).subscribe(res => {
      this.employee = res.data;

      },
      err => {
        console.log(err);
      },
      () => {
        this.todo = this.employee.todo;
        this.done = this.employee.done;
      })
    }
  }

  /**
   *
   * @param empId
   * @param todo
   * @param done
  **/

  private updateTaskList(empId: string, todo: item[], done: item[]): void {
    this.taskService.updateTask(empId, todo, done).subscribe(res => {
      this.employee = res.data;
    },

    err => {
      console.log(err);
    },
      () => {
        this.todo = this.employee.todo;
        this.done = this.employee.done;
    })
  }
}
