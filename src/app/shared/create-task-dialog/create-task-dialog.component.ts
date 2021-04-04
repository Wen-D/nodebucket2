/***
** Title: app.js
** Author: Wendy Leon
** Date: April 3 2021
** Description: API - findEmployeeById Sprint 1
 ***/

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-task-dialog',
  templateUrl: './create-task-dialog.component.html',
  styleUrls: ['./create-task-dialog.component.css']
})

export class CreateTaskDialogComponent implements OnInit {

  taskForm: FormGroup
  constructor(private dialogRef: MatDialogRef<CreateTaskDialogComponent>, private fb: FormBuilder) { }
  ngOnInit(): void {
    this.taskForm = this.fb.group({
      text: [null, Validators.compose([Validators.required, Validators.minLength(10)])]
    })
  }

  //on submit create task
  createTask() {
    this.dialogRef.close(this.taskForm.value)
  }

  // close form
  cancel() {
    this.dialogRef.close();
  }

}
