import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/services/backend.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-list-tagging',
  templateUrl: './list-tagging.component.html',
  styleUrls: ['./list-tagging.component.css']
})
export class ListTaggingComponent implements OnInit {
  urlHttpParams: any = {};
  tags: any[] = [];
  showError: string = '';
  constructor(private router: Router, private _beService: BackendService, private userService: UserService) {
   

  }

  ngOnInit(): void {
    this.setTaggingData(1, 10)
  }

  async setTaggingData(page: number, pageSize: number) {
    this.tags = []
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
      if(returnedAlerts.data.status == 200) this.tags = returnedAlerts.data.payLoad;
    }
  }


  setData(page: number, pageSize: number) {
    this.urlHttpParams = {
      adminId : this.userService.getUserId()    
    };
    return new Promise((resolve, reject) => {
        try {
        this._beService
          .getMethod(
            'common/get/tagging/head?',
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
    let url = `settings/tagging/create-edit-tagging/${data.id}`;
    this.router.navigateByUrl(url, { state: { data: data } });
  }

}
