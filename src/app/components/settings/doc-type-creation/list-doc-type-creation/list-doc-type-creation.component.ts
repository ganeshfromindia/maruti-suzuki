import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-list-doc-type-creation',
  templateUrl: './list-doc-type-creation.component.html',
  styleUrls: ['./list-doc-type-creation.component.css']
})
export class ListDocTypeCreationComponent implements OnInit {

  docTypes: any[] = [];

  constructor(private router: Router) {
    this.docTypes = [
      {id:1 , docType: 'Contract Version 1'},
      {id:2 , docType: 'Final Contract'},
      {id:3 , docType: 'Pre Sales'},
      {id:4 , docType: 'Delivery Schedule'},
      {id:5 , docType: 'Finance Approval'}
    ]
  }

  ngOnInit(): void {
  }

  //post edit id to edit component
  postEditId(data: any) {
    let url = `settings/doc-type-creation/create-edit-doc-type-creation/${data.id}`;
    this.router.navigateByUrl(url);
  }

}
