import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/services/backend.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-list-proj-type-creation',
  templateUrl: './list-proj-type-creation.component.html',
  styleUrls: ['./list-proj-type-creation.component.css']
})
export class ListProjTypeCreationComponent implements OnInit {

  public projType: string = '';
  public additionalField: string = '';
  public projectTypes: any[] = [];
  public urlHttpParams: any = {};
  public showError: string = '';

  constructor(private _beService: BackendService, public router: Router, private userService: UserService) { }

  ngOnInit(): void {
  }


  async setSearchData() {
    this.projectTypes = []
    let returnedAlerts: any = await this.setData();
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
      if(returnedAlerts.data.status == 200) this.projectTypes = returnedAlerts.data.payLoad;
    }
  }

  setData() {
    this.urlHttpParams = {
      companyId: this.userService.getCompanyID(),
      capex: this.projType,
      additionalField: this.additionalField,
      id: ''
    };
    return new Promise((resolve, reject) => {
        try {
        this._beService
          .getMethod(
            'get/project/type?',
            undefined,
            undefined,
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
  
  //post edit id to edit component
  postEditId(data: any) {
    let url = `project/proj-type-creation-sa/create-edit-proj-type-creation/${data.id}`;
    this.router.navigateByUrl(url, { state: { data: data } });
  }
}
