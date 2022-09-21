import { Component } from '@angular/core';
import {  NavigationEnd, Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public isMenuCollapsed = false;
  public pageRouteDetails: any;
    constructor( private router: Router) {
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.pageRouteDetails = e.urlAfterRedirects;
      }
    });
  }
}
