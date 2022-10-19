import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/services/backend.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-search-document',
  templateUrl: './search-document.component.html',
  styleUrls: ['./search-document.component.css']
})
export class SearchDocumentComponent implements OnInit {

  public urlHttpParams: any = {};
  public tags: any[] = [];
  public docTypes: any[] = [];
  public projects: any[] = [];
  public userAllData: any[] = [];
  public documents: any[] = [];
  public showError: string = '';
  public showSuccess: string = '';
  public documentSearchForm: FormGroup;

  constructor(
    private router: Router,
    private _beService: BackendService,
    private userService: UserService,
    private _fb: FormBuilder
  ) {
    this.documentSearchForm = this._fb.group({
      documentName: [''],
      documentId: [''],
      createdBy: [''],
      startTime: [''],
      endTime: [''],
      taggingHead: this._fb.array([]),
    });
  }

  ngOnInit(): void {
    this.setDocTypes(1, 10);
    this.setTaggingData(1, 10);
    this.setProjects(1, 10);
    this.setUserData(1, 10);
    this.projects = [
      { id: 1, projectName: 'Mumbai Nagpur Highway' },
      { id: 2, projectName: 'Kandla Port Extn' },
      { id: 3, projectName: 'Madurai Power Plant' },
      { id: 4, projectName: 'Shikrapur Mining Modification' },
      { id: 5, projectName: 'Sutlej Dam' }
    ];
  }

  async setDocTypes(page: number, pageSize: number) {
    this.docTypes = [];
    let url = 'common/get/document/type?';
    this.urlHttpParams = {
      adminId: this.userService.getUserId(),
    };
    let returnedAlerts: any = await this.setData(
      page,
      pageSize,
      url,
      this.urlHttpParams
    );
    if (returnedAlerts.flag) {
      if (returnedAlerts.data.status == 404) {
        this.showError = 'Data Not Found';
      } else {
        this.showError = 'Something went wrong';
      }
      setTimeout(() => {
        this.showError = '';
      }, 5000);
    } else {
      if (returnedAlerts.data.status == 200)
        this.docTypes = returnedAlerts.data.payLoad;
    }
  }

  async setTaggingData(page: number, pageSize: number) {
    this.tags = [];
    let url = 'common/get/tagging/head?';
    this.urlHttpParams = {
      adminId: this.userService.getUserId(),
    };
    let returnedAlerts: any = await this.setData(
      page,
      pageSize,
      url,
      this.urlHttpParams
    );
    if (returnedAlerts.flag) {
      if (returnedAlerts.data.status == 404) {
        this.showError = 'Data Not Found';
      } else {
        this.showError = 'Something went wrong';
      }
      setTimeout(() => {
        this.showError = '';
      }, 5000);
    } else {
      if (returnedAlerts.data.status == 200)
        this.tags = returnedAlerts.data.payLoad;
    }
  }

  async setProjects(page: number, pageSize: number) {
    return
    this.projects = [];
    let url = 'common/get/tagging/head?';
    this.urlHttpParams = {
      adminId: this.userService.getUserId(),
    };
    let returnedAlerts: any = await this.setData(
      page,
      pageSize,
      url,
      this.urlHttpParams
    );
    if (returnedAlerts.flag) {
      if (returnedAlerts.data.status == 404) {
        this.showError = 'Data Not Found';
      } else {
        this.showError = 'Something went wrong';
      }
      setTimeout(() => {
        this.showError = '';
      }, 5000);
    } else {
      if (returnedAlerts.data.status == 200)
        this.projects = returnedAlerts.data.payLoad;
    }
  }

  async setUserData(page: number, pageSize: number) {
    this.userAllData = [];
    let url = 'auth/get/user-list?';
    this.urlHttpParams = {
      userName: '',
      companyId: this.userService.getCompanyID(),
      emailId: ''
    };
    let returnedAlerts: any = await this.setData(page,
      pageSize,
      url,
      this.urlHttpParams
    );
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
      
    }
  }
  setData(page: number, pageSize: number, url: string, httpParams: any) {
    return new Promise((resolve, reject) => {
      try {
        this._beService
          .getMethod(url, page, pageSize, httpParams)
          .subscribe({
            next: (resolvedData) => {
              let alertsFetched = this.userService.handleAlerts(
                resolvedData,
                false
              );
              resolve(alertsFetched);
            },
            error: (errorData) => {
              let alertsFetched = this.userService.handleAlerts(
                errorData,
                true
              );
              resolve(alertsFetched);
            },
          });
      } catch (e) {
        let alertsFetched = this.userService.handleAlerts(e, true);
        reject(alertsFetched);
      }
    });
  }

  onChange(id: string, data: any) {
    const tagsArray: FormArray = this.documentSearchForm.get(
      'taggingHead'
    ) as FormArray;

    if (data.target.checked) {
      tagsArray.push(new FormControl(id));
    } else {
      let index = tagsArray.controls.findIndex((x) => x.value == id);
      tagsArray.removeAt(index);
    }
  }

  

  async onSubmitDocumentSearch() {
    const formData = this.documentSearchForm.getRawValue();
    let returnedAlerts: any = await this.postData(formData);
    if(returnedAlerts.flag) {
      if(returnedAlerts.data.status == 404) {
        this.showError = "Data Not Found";
      } else {
        this.showError = "Something went wrong";
      }
      setTimeout(() => {
        this.showError = '';
      },5000)
    } else {
      if(returnedAlerts.data.status == 200) this.documents = returnedAlerts.data.payLoad;
    }
   
  }

  postData(formData: any) {
    formData.startTime = new Date(formData.startTime).getTime();
    formData.endTime = new Date(formData.endTime).getTime();
    formData.companyId  = this.userService.getCompanyID();
    this.urlHttpParams = {
      companyId : formData.companyId,
      documentName: formData.documentName,
      createdBy: formData.createdBy,
      documentId: formData.documentId,
      endTime: formData.endTime,
      startTime: formData.startTime,
      taggingHead: formData.taggingHead
    };
    return new Promise((resolve, reject) => {
        try {
          this._beService.getMethod('get/document/list?', undefined, undefined, this.urlHttpParams)
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

  downloadFile(filePath: any) {
    console.log(filePath)
    this._beService.getMethod('view-file?filePath='+filePath, undefined, undefined, {}).subscribe({
      next: (data) => {
        const blob = new Blob([data]);
        const url= window.URL.createObjectURL(blob);
        window.open(url);
      },
      error: (errorData) => {
          this.showError = "Something went wrong";
        setTimeout(() => {
          this.showError = '';
        },5000)
      },
      
    })
  }


}
