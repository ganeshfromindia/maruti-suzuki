import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/services/backend.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-list-designation',
  templateUrl: './list-designation.component.html',
  styleUrls: ['./list-designation.component.css']
})
export class ListDesignationComponent implements OnInit {
  urlHttpParams: any = {};
  designations: any[] = [];
  total: number = 0
  showError: string = '';
  page: number = 1;
  pageSize: number = 10;
  constructor(private router: Router, private _beService: BackendService, private userService: UserService) { }

  ngOnInit(): void {
    this.setDesignationData(1, 10)
  }
  async setDesignationData(page: number, pageSize: number) {
    this.designations = []
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
      if(returnedAlerts.data.status == 200) this.designations = returnedAlerts.data.payLoad;
      this.page = page;
      this.pageSize = pageSize;
      this.total = returnedAlerts.data.totalRow;
    }
  }


  setData(page: number, pageSize: number) {
    this.urlHttpParams = {
      companyId: this.userService.getCompanyID()    
    };
    return new Promise((resolve, reject) => {
        try {
        this._beService
          .getMethod(
            'get/designation-list?',
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
    this.setDesignationData(page, this.pageSize)
  }

  // set pageSize data on page change
  async setPageSize(data: any) {
    let pageSize = data.target.value;
    this.setDesignationData(1, pageSize)
  }



  //post edit id to edit component
  postEditId(data: any) {
    let url = `settings/designation/create-edit-designation/${data.id}`;
    this.router.navigateByUrl(url, { state: { data: data } });
  }

}
