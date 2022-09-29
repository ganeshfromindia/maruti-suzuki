import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-list-proj-type-creation',
  templateUrl: './list-proj-type-creation.component.html',
  styleUrls: ['./list-proj-type-creation.component.css']
})
export class ListProjTypeCreationComponent implements OnInit {

  projType: string = '';
  additionalField: string = '';
  projectTypes: any[] = [];
  urlHttpParams: any = {};

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  setSearchTerm() {
      this.urlHttpParams = {
        projType: this.projType,
        additionalField: this.additionalField,
        id: ''
      };
      this.projectTypes = [
        {id:1 , projDesc: 'Vistra Project'},
        {id:2 , projDesc: 'Munis Large Project'},
        {id:3 , projDesc: 'Stadius Project'},
        {id:4 , projDesc: 'Acmara project'},
        {id:5 , projDesc: 'Pasios Project'}
      ]
    }

  //post edit id to edit component
  postEditId(data: any) {
    let url = `project/proj-type-creation/create-edit-proj-type-creation/${data.id}`;
    this.router.navigateByUrl(url);
  }
}
