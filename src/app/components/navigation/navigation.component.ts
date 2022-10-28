import { Component, OnInit, QueryList, ViewChildren } from "@angular/core";
import { UserService } from "src/app/services/user.service";
import {  NavigationEnd, Router } from '@angular/router';
import { NgbDropdown } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.scss"],
})
export class NavigationComponent implements OnInit {
  public isMenuCollapsed = true;
  @ViewChildren(NgbDropdown) dropdowns!: QueryList<NgbDropdown>;
  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {}
  logout() {
    this.userService.logout();
    this.router.navigateByUrl("/login");
  }
  closeOthers(clickedDropdown: NgbDropdown, clickedDropdownMain: NgbDropdown) {
    // Close all dropdowns
    this.dropdowns.toArray().forEach(el => {
        el.close();
    });
    // Open the dropdown that was clicked on
    clickedDropdown.open();
    clickedDropdownMain.open();
   
  }
  
}
