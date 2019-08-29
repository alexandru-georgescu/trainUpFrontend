import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

  bool : boolean;

  constructor (private router : Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      if ( localStorage.getItem('loggedIn') == 'true') {
        this.bool = true;
      } else {
        this.bool = false;
      }

      if (this.bool == false) {
        this.router.navigate(['/']);
      }
      return this.bool;
  }
}
