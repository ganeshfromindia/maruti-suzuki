import { DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, from } from 'rxjs';
import { GaSearchUserService } from 'src/app/services/search-ga-user.service';


@Component({
  selector: 'app-ga-search-user',
  templateUrl: './ga-search-user.component.html',
  styleUrls: ['./ga-search-user.component.css'],
  providers: [GaSearchUserService, DecimalPipe],
})
export class GaSearchUserComponent implements OnInit {

  urlHttpParams: any = {};
  srchTrmUserName: string = '';
  srchTrmEmail: string = '';
  gaUserAllData$: Observable<any[]> = new Observable<any[]>();
  total$: Observable<number> = new Observable<number>((observer) => {
    observer.next(0);
  });
  showTE: boolean = false;

  page: number = 1;
  pageSize: number = 15;


  constructor(public service: GaSearchUserService, public router: Router) {
    this.gaUserAllData$ = service.gaUserAllData$
    this.total$ = service.total$;
  }

  ngOnInit(): void {
  }

  setSearchTerm() {
    this.urlHttpParams = {
      userName: this.srchTrmUserName,
      adminEmailId: this.srchTrmEmail,
      id: ''
    };
    this.service.getTableData(0, 10, this.urlHttpParams);
  }

  // setting current page data
  async setPage(page: any) {
    let pageP = page - 1;
    let pageSizeP = this.service.pageSize;
    let returnedStatusP: any = {};
    this.service.getTableData(pageP, pageSizeP, this.urlHttpParams);
    // returnedStatusP = this.service.getTableData(pageP, pageSizeP);

    // if (returnedStatusP.status) {
    //   this.showTE = true;
    //   setTimeout(() => {
    //     this.showTE = false;
    //   }, 5000);
    // }
  }

  // set pageSize data on page change
  async setPageSize(pageSize: any) {
    this.service.page = 1;
    let pageP = this.service.page - 1;
    let pageSizeP = pageSize.target.value;
    this.service.pageSize = pageSize.target.value;
    let returnedStatusP: any = {};
    returnedStatusP = this.service.getTableData(pageP, pageSizeP, this.urlHttpParams);

    if (returnedStatusP.status) {
      this.showTE = true;
      setTimeout(() => {
        this.showTE = false;
      }, 5000);
    }
  }

  //post edit id to edit component
  postEditId(data: any) {
    let url = `ga-user/ga-create-edit-user/${data.id}`;
    this.router.navigateByUrl(url);
  }

}
