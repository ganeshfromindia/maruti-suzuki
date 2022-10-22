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
  selector: 'app-upload-document',
  templateUrl: './upload-document.component.html',
  styleUrls: ['./upload-document.component.css'],
})
export class UploadDocumentComponent implements OnInit {
  public urlHttpParams: any = {};
  public tags: any[] = [];
  public docTypes: any[] = [];
  public projects: any[] = [];
  public additionalRights: any[] = [];
  public showError: string = '';
  public showSuccess: string = '';
  public fileName: string = '';
  public documentUploadForm: FormGroup;
  public formDataFile: FormData = new FormData();
  public showProcess: boolean = false;

  constructor(
    private router: Router,
    private _beService: BackendService,
    private userService: UserService,
    private _fb: FormBuilder
  ) {
    this.documentUploadForm = this._fb.group({
      document: ['', Validators.required],
      projectId: ['', Validators.required],
      additionalRights: [null, Validators.required],
      documentDate: ['', Validators.required],
      taggingHead: this._fb.array([]),
    });
  }

  ngOnInit(): void {
    this.setDocTypesData(1, 100);
    this.setProjectsData(1, 100);
    this.setTaggingData(1, 100);
    this.setAdditionalRightsData(1, 100);
  }

  async setDocTypesData(page: number, pageSize: number) {
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
  async setProjectsData(page: number, pageSize: number) {
    this.projects = [];
    let url = 'get/project/model?';
    this.urlHttpParams = {
      companyId: this.userService.getCompanyID(),
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

  async setAdditionalRightsData(page: number, pageSize: number) {
    this.additionalRights = [];
    let url = 'common/get/system/rights?';
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
        this.additionalRights = returnedAlerts.data.payLoad;
    }
  }

  setData(page: number, pageSize: number, url: string, httpParams: any) {
    return new Promise((resolve, reject) => {
      try {
        this._beService
          .getMethod(url, undefined, undefined, httpParams)
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
    const tagsArray: FormArray = this.documentUploadForm.get(
      'taggingHead'
    ) as FormArray;

    if (data.target.checked) {
      tagsArray.push(new FormControl(id));
    } else {
      let index = tagsArray.controls.findIndex((x) => x.value == id);
      tagsArray.removeAt(index);
    }
  }

  setFile(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      this.formDataFile = new FormData();
      this.formDataFile.append('file', file, file.name);
      this.fileName = file.name;
    }
  }

  async onSubmitDocumentUpload() {
    const formData = this.documentUploadForm.getRawValue();
    let returnedAlerts: any = await this.postData(formData);
    if(returnedAlerts.flag) {
      this.showProcess = false;
      if(returnedAlerts.data.status == 404) {
        this.showError = "Data Not Found";
      } else {
        this.showError = "Something went wrong";
      }
      setTimeout(() => {
        this.showError = '';
      },5000)
    } else {
      this.showSuccess = "Document Uploaded successfully";
      this.showProcess = true;
      setTimeout(() => {
        this.showSuccess = '';
      },5000)
    }
   
  }

  postData(formData: any) {
    formData.documentDate = new Date(formData.documentDate).getTime();
    formData.companyId  = this.userService.getCompanyID();
    formData.userId = this.userService.getUserId();
    formData.userType = this.userService.getUserType();
    return new Promise((resolve, reject) => {
        try {
          this._beService.postMethod('file-upload?userId=' + formData.userId + '&companyId='+ formData.companyId +'&documentDate='+ formData.documentDate +'&additionalRights='+ formData.additionalRights +'&document='+ formData.document+'&userType='+ formData.userType+'&taggingHead='+ formData.taggingHead+'&projectId='+ formData.projectId , this.formDataFile)
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

  processDocument() {
    
  }

}
