import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/services/backend.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-list-doc-type-creation',
  templateUrl: './list-doc-type-creation.component.html',
  styleUrls: ['./list-doc-type-creation.component.css']
})
export class ListDocTypeCreationComponent implements OnInit {

  urlHttpParams: any = {};
  docTypes: any[] = [];
  total: number = 0
  showError: string = '';
  page: number = 1;
  pageSize: number = 15;

  constructor(private router: Router, private _beService: BackendService, private userService: UserService) {
    this.docTypes = [
      {id:1 , docType: 'Contract Version 1'},
      {id:2 , docType: 'Final Contract'},
      {id:3 , docType: 'Pre Sales'},
      {id:4 , docType: 'Delivery Schedule'},
      {id:5 , docType: 'Finance Approval'}
    ]
  }

  ngOnInit(): void {
    this.setDocTypeData(1, 15)
  }
  async setDocTypeData(page: number, pageSize: number) {
    this.docTypes = []
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
      if(returnedAlerts.data.status == 200) this.docTypes = returnedAlerts.data.payLoad;
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
            'common/get/document/type?',
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
    this.setDocTypeData(page, this.pageSize)
  }

  
  //post edit id to edit component
  postEditId(data: any) {
    let url = `settings/doc-type-creation/create-edit-doc-type-creation/${data.id}`;
    this.router.navigateByUrl(url, { state: { data: data } });
  }

}
