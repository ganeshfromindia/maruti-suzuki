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
      documentName: ['', Validators.required],
      document: ['', Validators.required],
      searchText: ['', Validators.required],
      project: ['', Validators.required],
      userId: ['', Validators.required],
      documentFromDate: ['', Validators.required],
      documentToDate: ['', Validators.required],
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
    console.log(formData);
    this.documents = [
      {
        "createdOn": "2022-10-15T07:01:20.614+00:00",
        "lastUpdate": "2022-10-15T07:01:20.614+00:00",
        "id": 10,
        "userId": 3,
        "companyId": 2,
        "documentPath": "2/ADMIN/WORD/3.docx",
        "documentName": null,
        "documentDate": 1665532800000,
        "documentId": 1,
        "additionalRight": [],
        "taggingHead": [],
        "active": true
      },
      {
        "createdOn": "2022-10-15T06:59:03.952+00:00",
        "lastUpdate": "2022-10-15T06:59:03.952+00:00",
        "id": 7,
        "userId": 3,
        "companyId": 2,
        "documentPath": "2/SUPER_ADMIN/WORD/3.docx",
        "documentName": null,
        "documentDate": 1665705600000,
        "documentId": 3,
        "additionalRight": [],
        "taggingHead": [],
        "active": true
      },
      {
        "createdOn": "2022-10-15T06:40:06.022+00:00",
        "lastUpdate": "2022-10-15T06:40:06.022+00:00",
        "id": 6,
        "userId": 2,
        "companyId": 2,
        "documentPath": "Locate_2\\2\\22.Feature lists for  CMS v2.5 16th July 2022.docx",
        "documentName": "docx_2_2_3_1665816000985",
        "documentDate": 1665813305197,
        "documentId": 2,
        "additionalRight": [
          6,
          7
        ],
        "taggingHead": [
          9,
          10
        ],
        "active": true
      },
      {
        "createdOn": "2022-10-16T06:26:53.464+00:00",
        "lastUpdate": "2022-10-16T06:26:53.464+00:00",
        "id": 11,
        "userId": 3,
        "companyId": 2,
        "documentPath": "Locate_2\\3\\23.AndroidExpense.pdf",
        "documentName": "pdf_2_3_8_1665901613379",
        "documentDate": 1665901537938,
        "documentId": 2,
        "additionalRight": [
          6,
          7
        ],
        "taggingHead": [
          9,
          4
        ],
        "active": true
      },
      {
        "createdOn": "2022-10-16T07:08:35.272+00:00",
        "lastUpdate": "2022-10-16T07:08:35.272+00:00",
        "id": 14,
        "userId": 3,
        "companyId": 2,
        "documentPath": "Locate_2\\3\\abc.docx",
        "documentName": "pdf_2_3_8_1665904115181",
        "documentDate": 1665901537938,
        "documentId": 1,
        "additionalRight": [
          6,
          7
        ],
        "taggingHead": [
          9,
          4
        ],
        "active": true
      }
    ]
    return
   

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
      this.showSuccess = "Data saved successfully";
      setTimeout(() => {
        this.showSuccess = '';
      },5000)
    }
   
  }

  postData(formData: any) {
    formData.documentFromDate = new Date(formData.documentFromDate).getTime();
    formData.documentToDate = new Date(formData.documentToDate).getTime();
    formData.companyId  = this.userService.getCompanyID();
    formData.userId = this.userService.getUserId();
    formData.userType = this.userService.getUserType();
    return new Promise((resolve, reject) => {
        try {
          this._beService.postMethod('file-upload?id=' + formData.userId + '&companyId='+ formData.companyId +'&documentFromDate='+ formData.documentFromDate +'&additionalRights='+ formData.additionalRights +'&document='+ formData.document+'&userType='+ formData.userType+'&taggingHead='+ formData.taggingHead , {})
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


}
