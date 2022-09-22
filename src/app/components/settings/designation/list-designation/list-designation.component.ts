import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-list-designation',
  templateUrl: './list-designation.component.html',
  styleUrls: ['./list-designation.component.css']
})
export class ListDesignationComponent implements OnInit {
  designations: any[] = [];

  constructor(private router: Router) {
    this.designations = [
      {id:1 , designation: 'Manager'},
      {id:2 , designation: 'VP'},
      {id:3 , designation: 'Executive'},
      {id:4 , designation: 'DGM'},
      {id:5 , designation: 'MD'}
    ]
  }

  ngOnInit(): void {
  }

  //post edit id to edit component
  postEditId(data: any) {
    let url = `settings/designation/create-edit-designation/${data.id}`;
    this.router.navigateByUrl(url);
  }

}
