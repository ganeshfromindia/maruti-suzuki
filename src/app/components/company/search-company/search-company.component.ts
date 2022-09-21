import { DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, from } from 'rxjs';
import { SearchCompanyService } from 'src/app/services/search-company.service';

@Component({
  selector: 'app-search-company',
  templateUrl: './search-company.component.html',
  styleUrls: ['./search-company.component.css'],
  providers: [SearchCompanyService, DecimalPipe],
})
export class SearchCompanyComponent implements OnInit {
  urlHttpParams: any = {};
  srchTrmName: string = '';
  srchTrmEmail: string = '';
  companyAllData$: Observable<any[]> = new Observable<any[]>();
  total$: Observable<number> = new Observable<number>((observer) => {
    observer.next(0);
  });
  showTE: boolean = false;

  constructor(public service: SearchCompanyService, public router: Router) {
    this.companyAllData$ = service.companyAllData$;
    this.total$ = service.total$;
  }

  ngOnInit(): void {
    //this.service.getTableData(0,0)
  }

  setSearchTerm() {
    this.urlHttpParams = {
      companyName: this.srchTrmName,
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
    let url = `company/create-edit-company/${data.id}`;
    this.router.navigateByUrl(url);
  }

  
}
