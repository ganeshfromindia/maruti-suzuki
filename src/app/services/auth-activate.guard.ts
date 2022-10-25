import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';


@Injectable()
export class AuthActivateGuard implements CanActivate {
    authStatus: boolean = false;

  constructor(private readonly userService: UserService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        
    // this.userService.isAuthenticated$.subscribe((data) => this.authStatus = data);
    // console.log(this.userService.getAuthenticationStatus());
    //return this.userService.getAuthenticationStatus()
    if (this.userService.getAuthToken()) {
        return true
      } else {
        this.router.navigate(['/login'])
        return false
      }
  }
}