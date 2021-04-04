/***
** Title: app.js
** Author: Wendy Leon
** Date: April 3 2021
** Description: nodebucket
***/
import { item } from './item.interface';

export interface Employee {
  empId: string;
  todo: item[];
  done: item[];
}
