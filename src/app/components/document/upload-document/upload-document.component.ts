import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  showError: string = '';
  documentUploadForm: FormGroup;

  constructor(private router: Router, private _beService: BackendService, private userService: UserService, private _fb: FormBuilder) {
    this.documentUploadForm = this._fb.group({
      docType:['1', Validators.required],
      tags:this._fb.array([])
    })
  }

  ngOnInit(): void {
    this.setTaggingData(1, 10);
    this.setDocTypes(1, 10);
    this.docTypes = [
      {id: 1, docType: 'PDF'},
      {id: 2, docType: 'WORD'},
      {id: 3, docType: 'EXCEL'}
    ]
  }

  async setDocTypes(page: number, pageSize: number) {
    return
    this.docTypes = []
    let url = 'get/designation-list?';
    this.urlHttpParams = {
      companyId: this.userService.getCompanyID()    
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
      const tagsArray = this.documentUploadForm.get('tags') as FormArray;
      this.tags.forEach((data) => {
        tagsArray.push(this.buildTagsForm(data))
      })
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

  buildTagsForm(item: any) {
    return this._fb.group({
      id: item.id,
      taggingHeadName: item.taggingHeadName
    })
  }

  setTagForm(data: any) {
    console.log(data)
    if(data.target.checked) {
      
    }
  }

  onSubmitDocumentUpload() {
    const formData = this.documentUploadForm.getRawValue();
    console.log(formData);
  }

}
