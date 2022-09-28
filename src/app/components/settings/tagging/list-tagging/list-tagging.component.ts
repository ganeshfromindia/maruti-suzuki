import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-list-tagging',
  templateUrl: './list-tagging.component.html',
  styleUrls: ['./list-tagging.component.css']
})
export class ListTaggingComponent implements OnInit {

  tags: any[] = [];

  constructor(private router: Router) {
    this.tags = [
      {id:1 , taggingName: 'Government Notice'},
      {id:2 , taggingName: 'Response from Legal Team'},
      {id:3 , taggingName: 'Finance Remarks'},
      {id:4 , taggingName: 'Production Target'},
      {id:5 , taggingName: 'MOM'}
    ]
  }

  ngOnInit(): void {
  }

  //post edit id to edit component
  postEditId(data: any) {
    let url = `settings/tagging/create-edit-tagging/${data.id}`;
    this.router.navigateByUrl(url);
  }

}
