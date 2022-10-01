import { DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, from } from 'rxjs';
import { BackendService } from 'src/app/services/backend.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-search-company',
  templateUrl: './search-company.component.html',
  styleUrls: ['./search-company.component.css'],
  providers: [BackendService,UserService,DecimalPipe],
})
export class SearchCompanyComponent implements OnInit {
  urlHttpParams: any = {};
  srchTrmName: string = '';
  srchTrmEmail: string = '';
  companyAllData: any[]= [];
  total: number = 0
  showError: string = '';
  page: number = 1;
  pageSize: number = 10;

  constructor(public _beService: BackendService, public router: Router, private userService: UserService) {
    
  }

  ngOnInit(): void {
    //this.service.getTableData(0,0)
  }
  
  async setSearchData(page: number, pageSize: number) {
    this.companyAllData = []
    let returnedAlerts: any = await this.setData(page, pageSize);
    if(returnedAlerts.flag) {
      if(returnedAlerts.data.status == 404) {
        this.showError = "Data Not Found";
      } else {
        this.showError = "Something went wrong"
      }
      setTimeout(() => {
        this.showError = ''
      },5000)
    } else {
      if(returnedAlerts.data.status == 200) this.companyAllData = returnedAlerts.data.payLoad;
      this.page = page;
      this.pageSize = pageSize;
      this.total = returnedAlerts.data.totalRow;
    }
  }

  setData(page: number, pageSize: number) {
    this.urlHttpParams = {
      companyName: this.srchTrmName,
      adminEmailId: this.srchTrmEmail
    };
    return new Promise((resolve, reject) => {
        try {
        this._beService
          .getMethod(
            'get/company-list?',
            page,
            pageSize,
            this.urlHttpParams
          )
          .subscribe({
            next: (resolvedData) => {
              let alertsFetched = this.userService.handleAlerts(resolvedData, false);
              resolve(alertsFetched);
            },
            error: (errorData) => {
              let alertsFetched = this.userService.handleAlerts(errorData, true);
              resolve(alertsFetched);
            },
          });
      } catch (e) {
        let alertsFetched = this.userService.handleAlerts(e, true);
        reject(alertsFetched);
      }
    }) 
  }


  // setting current page data
  async setPage(page: any) {
    this.setSearchData(page, this.pageSize)
  }

  // set pageSize data on page change
  async setPageSize(data: any) {
    let pageSize = data.target.value;
    this.setSearchData(1, pageSize)
  }

  //post edit id to edit component
  postEditId(data: any) {
    
    let url = `company/create-edit-company/${data.id}`;
    this.router.navigateByUrl(url, { state: { data: data } });
  }

  
}
