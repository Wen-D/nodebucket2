/***
** Title: auth guard
** Author: Wendy Leon
** Date: March 18 2021
** Description: API - findEmployeeById
 ***/

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private router: Router, private cookieService: CookieService) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const sessionUser = this.cookieService.get('session_user');

    //if user authenticated - log in -

    if (sessionUser)
    {
      return true;
    }
    //if user cannot be authenticated redirect to log-in page
    else
    {
      this.router.navigate(['/session/login']);
      return false;
    }
  }
}
