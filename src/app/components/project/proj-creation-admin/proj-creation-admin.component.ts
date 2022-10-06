import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { BackendService } from 'src/app/services/backend.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-proj-creation-admin',
  templateUrl: './proj-creation-admin.component.html',
  styleUrls: ['./proj-creation-admin.component.css']
})
export class ProjCreationAdminComponent implements OnInit {
  public projTypeName: string = '';
  public projType: string = '';
  public projHierarchyData: any[] = [];
  public showError: string = '';
  public urlHttpParams: any = {};
  public projCreateForm: FormGroup = new FormGroup({});
  public userNameGroup : FormArray = new FormArray([])

  constructor(
    private _beService: BackendService,
    private userService: UserService,
    private _fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.projCreateForm = this._fb.group({
      users: this._fb.array([])
    })
  }

  async setSearchData() {
    this.projHierarchyData = [];
    let returnedAlerts: any = await this.setData();
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
      // if(returnedAlerts.data.status == 200) this.projHierarchyData = returnedAlerts.data.payLoad;
      if (returnedAlerts.data.status == 200) {
        this.projHierarchyData = [
          { id: 1, designation: 'Project Head', level: 1 },
          { id: 2, designation: 'Operations Manager', level: 3 },
          { id: 3, designation: 'Accounts Head', level: 3 },
          { id: 4, designation: 'Finance Manager', level: 4 },
        ];
        // this.userNameGroup = this._fb.array(this.getUserNames(this.projHierarchyData.length).map((data: any) => {
        //   this._fb.group(data)
        // }))
        // this.projCreateForm = this._fb.group({
        //   users: this.userNameGroup
        // })
        // this.projCreateForm.patchValue(this.projHierarchyData)
        const orderItemsArray = this.projCreateForm.get('users') as FormArray;
        this.projHierarchyData.forEach(item => {
          orderItemsArray.push(this.buildProjCreateForm(item))
        });
      }
    }
  }

  buildProjCreateForm(item: any): FormGroup {
    return this._fb.group({
      id: item.id,
      designation: item.designation,
      level: item.level,
      name: ''
    })
  }

  // getUserNames(length: number) {
  //   const userNamesArray = [];
  //   for (let x = 0; x < length; x++) {
  //     userNamesArray.push({
  //       id: [{value: '', disabled: true}],
  //       designation: [{value: '', disabled: true}],
  //       level: [{value: '', disabled: true}],
  //       name: ['']
  //     })
  //   }
  //   return userNamesArray;
  // }

  setData() {
    // this.urlHttpParams = {
    //   projName: this.srchTrmProjHierarchyName,
    //   projDesgn: this.srchTrmProjDesgn,
    //   level: this.srchTrmLevel,
    //   linkedTo: this.srchTrmLnkdTo,
    // };
    this.urlHttpParams = {
      companyName: 'locate',
      adminEmailId: '',
    };
    return new Promise((resolve, reject) => {
      try {
        this._beService
          .getMethod('get/company-list?', 1, 10, this.urlHttpParams)
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

  onSubmitProjCreateForm() {
    const formData = this.projCreateForm.getRawValue();
    console.log(formData);
  }

}
