import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { BackendService } from 'src/app/services/backend.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-create-edit-user',
  templateUrl: './create-edit-user.component.html',
  styleUrls: ['./create-edit-user.component.css']
})
export class CreateEditUserComponent implements OnInit {
  public urlHttpParams: any = {};
  public companyId: string = ''
  public userCreateEditForm: FormGroup;
  public role: string = '';
  public departments: any[] = [];
  public designations: any[] = [];
  public levels: any[] = [];
  public types: any[] = [];
  public companyAllData: any[]= [];
  public showError: string = '';
  public showSuccess: string = '';
  public page: number = 1;
  public pageSize: number = 10;
  public userDetails: any = {};


  constructor(private route: ActivatedRoute,private _fb: FormBuilder, private _beService: BackendService, private userService: UserService) { 
    this.userCreateEditForm = this._fb.group({
      id:[''],
      companyId:['', Validators.required],
      userName:['', Validators.required],
      firstName:['', Validators.required],
      lastName:['', Validators.required],
      password:['', Validators.required],
      departmentId:['', Validators.required],
      designationId:['', Validators.required],
      emailId:['', Validators.required],
      phoneNumber:['', Validators.required],
      level:['', Validators.required],
      userType:['', Validators.required],
      searchRights:['', Validators.required],
      additionalField:['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.role = this.userService.getUserType();
    this.role = 'superadmin';
    this.setCompanyData(1, 100);
    this.setDepartmentData(1, 100);
    this.setDesignationData(1, 100);
    this.userDetails = this.route.paramMap.pipe(map(() => window.history.state))
    this.userDetails.subscribe((data: any) => this.userDetails = data.data)
    this.userCreateEditForm.patchValue(this.userDetails);
    this.types = ['ADMIN','SUPER_ADMIN','OPERATION']

    this.companyId = this.route.snapshot.params['id'];
    if(this.companyId) {
      this.userCreateEditForm && this.userCreateEditForm.get('companyId') && this.userCreateEditForm.get('companyId')?.disable()
    }
  }


  async setCompanyData(page: number, pageSize: number, url = 'get/company-list?') {
    this.companyAllData = []
    let returnedAlerts: any = await this.setData(page, pageSize, url);
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
      if(returnedAlerts.data.status == 200) this.companyAllData = returnedAlerts.data.payLoad;
    }
  }
  async setDepartmentData(page: number, pageSize: number, url = 'get/department-list?') {
    this.departments = []
    let returnedAlerts: any = await this.setData(page, pageSize, url);
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
      if(returnedAlerts.data.status == 200) this.departments = returnedAlerts.data.payLoad;
    }
  }
  async setDesignationData(page: number, pageSize: number, url = 'get/designation-list?') {
    this.designations = []
    let returnedAlerts: any = await this.setData(page, pageSize, url);
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
      if(this.userDetails) {
        let levelFromEdit = this.designations.filter((data: any) => data.id == this.userDetails.designationId);
        levelFromEdit = levelFromEdit[0].level;
        this.userCreateEditForm.patchValue({level: levelFromEdit})
      }
    }
  }
  setData(page: number, pageSize: number, url: string) {
    this.urlHttpParams = {
      companyId : this.userService.getCompanyID(),
      id: ''
    };
    return new Promise((resolve, reject) => {
        try {
        this._beService
          .getMethod(
            url,
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

  setLevel(dataP: any) {
    let levelFromChange = this.designations.filter((data: any) => data.id == dataP.target.value);
    levelFromChange = levelFromChange[0].level;
    this.userCreateEditForm.patchValue({level: levelFromChange})
  }

  async onSubmitUserCreateEdit() {
    const formData = await this.userCreateEditForm.getRawValue();
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
      if(returnedAlerts.data.status == 200) this.userCreateEditForm.reset();
      this.showSuccess = "Data saved successfully";
      setTimeout(() => {
        this.showSuccess = '';
      },5000)
    }
  }

  postData(formData: any) {
    formData.companyName = this.companyAllData.filter((data: any) => data.id == formData.companyId);
    formData.companyName = formData.companyName[0].companyName;
    console.log(formData);
    return new Promise((resolve, reject) => {
        try {
          this._beService.postMethod('auth/user/register', formData)
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


  numberOnly(event: any) {
    var numberStatus = this.userService.numberOnly(event);
    return numberStatus;
  }
}
