import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-search-right',
  templateUrl: './list-search-right.component.html',
  styleUrls: ['./list-search-right.component.css']
})
export class ListSearchRightComponent implements OnInit {

  RightsTypes: any[] = [];

  constructor(private router: Router) {
    this.RightsTypes = [
      {id:1 , rightDesc: 'Within Company', name:'Harish'},
      {id:2 , rightDesc: 'Created by User', name:'Ahmed'},
      {id:3 , rightDesc: 'Created by Roles less than him across departments', name: 'Peter'},
      {id:4 , rightDesc: 'Created by Roles less than or equal to him across departments', name:'Mani'},
      {id:5 , rightDesc: 'Created by Roles less than him in same departments', name: 'Devidas'},
      {id:6 , rightDesc: 'Created by Roles less than or equal to him in same departments', name: 'Narendra'}
    ]
  }

  ngOnInit(): void {
  }

  //post edit id to edit component
  postEditId(data: any) {
    let url = `settings/search-right/create-edit-search-right/${data.id}`;
    this.router.navigateByUrl(url);
  }

}
