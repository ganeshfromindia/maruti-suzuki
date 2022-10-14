import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/services/backend.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-upload-document',
  templateUrl: './upload-document.component.html',
  styleUrls: ['./upload-document.component.css']
})
export class UploadDocumentComponent implements OnInit {

  urlHttpParams: any = {};
  tags: any[] = [];
  docTypes: any[] = [];
  additionalRights: any[] = [];
  showError: string = '';
  documentUploadForm: FormGroup;

  constructor(private router: Router, private _beService: BackendService, private userService: UserService, private _fb: FormBuilder) {
    this.documentUploadForm = this._fb.group({
      docType:['1', Validators.required],
      additionalRights :[null, Validators.required],
      taggingHead :this._fb.array([])
    })
  }

  ngOnInit(): void {
    this.setTaggingData(1, 10);
    this.setDocTypes(1, 10);
    this.additionalRights = [
      {id: 1, right: 'Within Company'},
      {id: 2, right: 'Across Department'},
      {id: 3, right: 'Sub Department'},
      {id: 4, right: 'Within Company'},
      {id: 5, right: 'Across Department'},
      {id: 6, right: 'Sub Department'},
      {id: 7, right: 'Within Company'},
      {id: 8, right: 'Across Department'},
      {id: 9, right: 'Sub Department'}
    ]
  }

  async setDocTypes(page: number, pageSize: number) {
    this.docTypes = []
    let url = 'common/get/document/type?';
    this.urlHttpParams = {
      adminId : this.userService.getUserId()    
    };
    let returnedAlerts: any = await this.setData(page, pageSize, url, this.urlHttpParams);
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
    }
  }


  

  async setTaggingData(page: number, pageSize: number) {
    this.tags = []
    let url = 'common/get/tagging/head?';
    this.urlHttpParams = {
      adminId : this.userService.getUserId()    
    };
    let returnedAlerts: any = await this.setData(page, pageSize, url, this.urlHttpParams);
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


  setData(page: number, pageSize: number, url: string, httpParams: any) {
    return new Promise((resolve, reject) => {
        try {
        this._beService
          .getMethod(
            url,
            undefined,
            undefined,
            httpParams
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

  onChange(id: string, data: any) {
    const tagsArray: FormArray = this.documentUploadForm.get('taggingHead') as FormArray;

    if (data.target.checked) {
      tagsArray.push(new FormControl(id));
    } else {
      let index = tagsArray.controls.findIndex(x => x.value == id)
      tagsArray.removeAt(index);
    }
  }

  onSubmitDocumentUpload() {
    const formData = this.documentUploadForm.getRawValue();
    console.log(formData);
  }

}
