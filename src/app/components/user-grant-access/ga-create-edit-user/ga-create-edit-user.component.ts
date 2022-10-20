import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from 'src/app/services/backend.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-ga-create-edit-user',
  templateUrl: './ga-create-edit-user.component.html',
  styleUrls: ['./ga-create-edit-user.component.css']
})
export class GaCreateEditUserComponent implements OnInit {
  public urlHttpParams: any = {};
  public companyId: string = ''
  public userCreateEditForm: FormGroup;
  public users: any[] = [];
  public departments: any[] = [];
  public designations: any[] = [];
  public types: any[] = [];
  public userDetails: any = {};
  public showError: string = '';
  public showSuccess: string = '';
  public rightsTypes: any[]= [];

  constructor(private route: ActivatedRoute,private _fb: FormBuilder, private _beService: BackendService, private userService: UserService) { 
    this.userCreateEditForm = this._fb.group({
      userName:['', Validators.required],
      department:['', Validators.required],
      designation:['', Validators.required],
      emailId:['', Validators.required],
      phoneNumber:['', Validators.required],
      level:['', Validators.required],
      userType:['', Validators.required],
      searchRights:['', Validators.required],
      additionalField:['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.setUsersData(1, 100)
    this.setDepartmentData(1, 100)
    this.setDesignationData(1, 100)
    this.setRightsData(1, 100)
    this.types = ['ADMIN','SUPER_ADMIN','OPERATIONS']
    this.companyId = this.route.snapshot.params['id'];
    if(this.companyId) {
      this.userCreateEditForm && this.userCreateEditForm.get('userName') && this.userCreateEditForm.get('userName')?.disable()
    //  this.urlHttpParams = {
    //    userName: '',
    //    adminEmailId: '',
    //    id: this.value
    //  };  
    //  this._beService
    //       .getMethod(
    //         'get/company-list?',
    //         page,
    //         pageSize,
    //         urlHttpParams
    //       )
    //       .subscribe({
    //   next: data => {
    //     console.log(data);
    //   },
    //   error: e => {
    //     console.log(e);
    //   }
    // })
      let x = {
        userName: 3,
        department:2,
        designation:5,
        emailId:'venu@gmail.com',
        phoneNumber:'8425031410',
        level:3,
        userType:4,
        searchRights:'all',
        additionalField: 'TBD',
        
      }
      this.userCreateEditForm.patchValue(x)
    } else {
      this.userCreateEditForm.patchValue({
        userName: ''
      })
    }
  }

  async setUsersData(page: number, pageSize: number, url = 'auth/get/user-list?') {
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
      if(returnedAlerts.data.status == 200) this.users = returnedAlerts.data.payLoad;
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

  async setRightsData(page: number, pageSize: number, url = 'common/get/system/rights?') {
    this.rightsTypes = []
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
      if(returnedAlerts.data.status == 200) this.rightsTypes = returnedAlerts.data.payLoad;
      
    }
  }
  setData(page: number, pageSize: number, url: string) {
    this.urlHttpParams = {
      companyId : this.userService.getCompanyID(),
      adminId: this.userService.getUserId(),
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
  onSubmitUserCreateEdit() {
    const formData = this.userCreateEditForm.getRawValue();
    console.log(formData);
  }

  numberOnly(event: any) {
    var numberStatus = this.userService.numberOnly(event);
    return numberStatus;
  }
}
