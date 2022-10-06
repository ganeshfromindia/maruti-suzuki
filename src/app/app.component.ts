import { Component, OnInit } from '@angular/core';
import {  NavigationEnd, Router } from '@angular/router';
import { UserService } from './services/user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public isMenuCollapsed = false;
  public pageRouteDetails: any;
    constructor(private authService: UserService, private router: Router) {
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.pageRouteDetails = e.urlAfterRedirects;
      }
    });
  }

  ngOnInit(): void {
    if (!!sessionStorage.getItem("authToken") === false) {
      this.authService.logout();
      this.router.navigateByUrl("/login");
    }
  }

  isAuthenticated() {
    return !!sessionStorage.getItem("authToken");
    // return !!this.authService.getAuthToken();
  }
}
