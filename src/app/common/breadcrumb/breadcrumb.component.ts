import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {
  routeDataArr: any[] = [];
  routeData1: any[] = [];
  routeData: any[] = [];
  link: string = ''
  @Input() public set fetchPageRouteDetails(data: any) {
    if(data) {
      this.routeData = [];
      this.routeDataArr = data.split('/');
      this.routeDataArr.forEach((data, index) => {
        if(index == 0 ) {
          this.link = data
          this.routeData.push({link: this.link, cLink : data})
        } else {
          this.link = this.link + '/' + data;
          this.routeData.push({link: this.link, cLink : data})
        }
      })
      this.routeData.shift();
    }
  }
  constructor() { }

  ngOnInit(): void {
  }

}
