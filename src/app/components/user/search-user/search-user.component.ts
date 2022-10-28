import { DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, from } from 'rxjs';
import { BackendService } from 'src/app/services/backend.service';
import { SearchUserService } from 'src/app/services/search-user.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.css'],
  providers: [SearchUserService, DecimalPipe],
})
export class SearchUserComponent implements OnInit {
  public role: string = '';
  public urlHttpParams: any = {};
  public srchTrmCoName: string = '';
  public srchTrmUserName: string = '';
  public srchTrmEmail: string = '';
  public showTE: boolean = false;
  public userAllData: any[] = [];
  public total: number = 0
  public showError: string = '';
  public page: number = 1;
  public pageSize: number = 10;

  constructor(private _beService: BackendService, public router: Router, private userService: UserService) {
  }

  ngOnInit(): void {
    this.role = sessionStorage.getItem("role") || '';
    this.role = 'superadmin';
  }

  async setSearchData(page: number, pageSize: number) {
    this.userAllData = []
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
      if(returnedAlerts.data.status == 200) this.userAllData = returnedAlerts.data.payLoad;
      this.page = page;
      this.pageSize = pageSize;
      this.total = returnedAlerts.data.totalRow;
    }
  }
  setData(page: number, pageSize: number) {
    this.urlHttpParams = {
      companyName: this.srchTrmCoName,
      userName: this.srchTrmUserName,
      adminEmailId: this.srchTrmEmail,
      id: ''
    };
    return new Promise((resolve, reject) => {
        try {
        this._beService
          .getMethod(
            'auth/get/user-list?',
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
    console.log("in set page")
    this.setSearchData(page, this.pageSize)
  }

  


  //post edit id to edit component
  postEditId(data: any) {
    let url = `user/create-edit-user/${data.id}`;
    this.router.navigateByUrl(url, { state: { data: data } });
  }


}
