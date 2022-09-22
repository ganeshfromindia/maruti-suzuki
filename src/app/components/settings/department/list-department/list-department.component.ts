import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-department',
  templateUrl: './list-department.component.html',
  styleUrls: ['./list-department.component.css']
})
export class ListDepartmentComponent implements OnInit {

  departments: any[] = [];

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.departments = [
      {id:1 , departmentName: 'HR'},
      {id:2 , departmentName: 'Marketing'},
      {id:3 , departmentName: 'Store'},
      {id:4 , departmentName: 'Accounts'},
      {id:5 , departmentName: 'PR'}
    ]
  }

  //post edit id to edit component
  postEditId(data: any) {
    let url = `settings/department/create-edit-department/${data.id}`;
    this.router.navigateByUrl(url);
  }

}
