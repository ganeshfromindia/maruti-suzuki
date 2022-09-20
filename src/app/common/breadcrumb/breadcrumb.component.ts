import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {
  routeData: any[] = [];
  @Input() public set fetchPageRouteDetails(data: any) {
    console.log(data)
    if(data) {
      this.routeData = data.split('/');
      this.routeData.shift();
      console.log(this.routeData)
    }
  }
  constructor() { }

  ngOnInit(): void {
  }

}
