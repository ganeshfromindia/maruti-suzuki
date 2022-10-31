import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BackendService } from 'src/app/services/backend.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-proj-creation-admin',
  templateUrl: './proj-creation-admin.component.html',
  styleUrls: ['./proj-creation-admin.component.css']
})
export class ProjCreationAdminComponent implements OnInit {
  
  public projHierarchyData: any[] = [];
  public urlHttpParams: any = {};
  public projCreateForm: FormGroup = new FormGroup({});
  public userNameGroup : FormArray = new FormArray([])
  public projTypes: any[] = []; 
  public showSelectError: boolean = false;
  public userAllData: any[] = [];
  public showError: string = '';
  public showSuccess: string = '';
  public pData: any ={};
  public setdisabled: boolean = false;

  constructor(
    private _beService: BackendService,
    private userService: UserService,
    private _fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.projCreateForm = this._fb.group({
      projTypeName: ['', Validators.required],
      projType: ['', Validators.required],
      users: this._fb.array([]),

    })
    this.setProjHierarchies();
    this.setUserData();
  }

  async setUserData() {
    this.userAllData = [];
    let url = 'auth/get/user-list?';
    this.urlHttpParams = {
      userName: '',
      companyId: this.userService.getCompanyID(),
      emailId: ''
    };
    let returnedAlerts: any = await this.setData(url, this.urlHttpParams);
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

  async setProjHierarchies() {
    let url = 'get/project/type?';
    this.urlHttpParams = {
      companyId: this.userService.getCompanyID(),
      capex: ''  
    };
    this.projTypes = []
    let returnedAlerts: any = await this.setData(url, this.urlHttpParams);
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
      if(returnedAlerts.data.status == 200) this.projTypes = returnedAlerts.data.payLoad;
      
    }
  }

  async setSearchData() {
    const formData = this.projCreateForm.getRawValue();
    if(formData.projType == 'select') {
      this.showSelectError = true;
      return
    }else {
      this.showSelectError = false;
    }
    this.projHierarchyData = formData.projType.projectHierarchy.hierarchyDetailList;
    this.projHierarchyData = this.projHierarchyData.sort((a: any, b:any) => {
      if(a.level < b.level) {return -1}
      if(a.level > b.level) {return 1}
      return 0;
    })
    const usersArray = this.projCreateForm.get('users') as FormArray
    this.projHierarchyData.forEach((data) => {
      usersArray.push(this.buildProjCreateForm(data))
    })
  }

  buildProjCreateForm(item: any): FormGroup {
    return this._fb.group({
      designationId: [item.designationId, Validators.required],
      designationName: [{value: item.designationName, disabled: true}, Validators.required],
      level: [{value: item.level, disabled: true}, Validators.required],
      linkedTo: [item.linkedTo, Validators.required],
      userId: ['', Validators.required],
    })
  }

  setData(url: string, urlParams: any) {
    return new Promise((resolve, reject) => {
      try {
        this._beService
          .getMethod(url, 1, 100, urlParams)
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

  async onSubmitProjCreateForm() {
    const formData = this.projCreateForm.getRawValue();
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
      if(returnedAlerts.data.status == 200) this.projCreateForm.reset();
      this.showSuccess = "Data saved successfully";
      setTimeout(() => {
        this.showSuccess = '';
      },5000)
    }
  }

  postData(formData: any) {
    return new Promise((resolve, reject) => {
        try {
          this.pData.companyId  = this.userService.getCompanyID();
          this.pData.adminId = this.userService.getUserId();
          console.log(formData.projType)
          this._beService.postMethod('project/model/save?projectName='+ formData.projTypeName +'&companyId=' + this.pData.companyId +'&adminId='+ this.pData.adminId +'&projectTypeId='+formData.projType.id, formData.users)
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
