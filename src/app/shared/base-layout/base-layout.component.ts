/***
** Title: app.js
** Author: Wendy Leon
** Date: March 25 2021
** Description: API - findEmployeeById Sprint 1
 ***/

/**
 * Require statements
 */

import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.css']
})

export class BaseLayoutComponent implements OnInit {

  year: number = Date.now();

  constructor(private cookieService: CookieService, private router: Router) { }

  ngOnInit(): void {
  }
  // sign out function - redirects to sign in page
  signOut() {
    this.cookieService.deleteAll();
    this.router.navigate(['/session/login']);
  }

}
