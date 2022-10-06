import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user.service";
import {  NavigationEnd, Router } from '@angular/router';

@Component({
  selector: "app-navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.scss"],
})
export class NavigationComponent implements OnInit {
  public isMenuCollapsed = true;
  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {}
  logout() {
    this.userService.logout();
    this.router.navigateByUrl("/login");
  }
}
