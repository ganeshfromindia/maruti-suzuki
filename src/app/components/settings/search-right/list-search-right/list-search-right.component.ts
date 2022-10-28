import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/services/backend.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list-search-right',
  templateUrl: './list-search-right.component.html',
  styleUrls: ['./list-search-right.component.css']
})
export class ListSearchRightComponent implements OnInit {
  urlHttpParams: any = {};
  srchTrmName: string = '';
  srchTrmEmail: string = '';
  rightsTypes: any[]= [];
  total: number = 0
  showError: string = '';
  page: number = 1;
  pageSize: number = 15;
  constructor(private router: Router, private _beService: BackendService, private userService: UserService) { }


  ngOnInit(): void {
    this.setRightsData(1, 15)
  }

  async setRightsData(page: number, pageSize: number) {
    this.rightsTypes = []
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
      if(returnedAlerts.data.status == 200) this.rightsTypes = returnedAlerts.data.payLoad;
      this.page = page;
      this.pageSize = pageSize;
      this.total = returnedAlerts.data.totalRow;
    }
  }


  setData(page: number, pageSize: number) {
    this.urlHttpParams = {
      adminId: this.userService.getUserId()    
    };
    return new Promise((resolve, reject) => {
        try {
        this._beService
          .getMethod(
            'common/get/system/rights?',
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
    this.setRightsData(page, this.pageSize)
  }

  

  //post edit id to edit component
  postEditId(data: any) {
    let url = `settings/search-right/create-edit-search-right/${data.id}`;
    this.router.navigateByUrl(url, { state: { data: data } });
  }

}
