import { DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, from } from 'rxjs';
import { SearchUserService } from 'src/app/services/search-user.service';


@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.css'],
  providers: [SearchUserService, DecimalPipe],
})
export class SearchUserComponent implements OnInit {
  role: string = '';
  urlHttpParams: any = {};
  srchTrmCoName: string = '';
  srchTrmUserName: string = '';
  srchTrmEmail: string = '';
  userAllData$: Observable<any[]> = new Observable<any[]>();
  total$: Observable<number> = new Observable<number>((observer) => {
    observer.next(0);
  });
  showTE: boolean = false;

  constructor(public service: SearchUserService, public router: Router) {
    this.userAllData$ = service.userAllData$;
    this.total$ = service.total$;
  }

  ngOnInit(): void {
    this.role = sessionStorage.getItem("role") || '';
    this.role = 'superadmin';
  }

  setSearchTerm() {
    this.urlHttpParams = {
      companyName: this.srchTrmCoName,
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
    let url = `user/create-edit-user/${data.id}`;
    this.router.navigateByUrl(url);
  }


}
