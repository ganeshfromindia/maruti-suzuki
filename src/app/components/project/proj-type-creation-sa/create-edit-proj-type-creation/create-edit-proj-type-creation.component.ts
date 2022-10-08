import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { BackendService } from 'src/app/services/backend.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-edit-proj-type-creation',
  templateUrl: './create-edit-proj-type-creation.component.html',
  styleUrls: ['./create-edit-proj-type-creation.component.css']
})
export class CreateEditProjTypeCreationComponent implements OnInit {

  public projTypeId: string = '';
  public projTypeCreateEditForm: FormGroup;
  public projTypeDetails: any = {};
  public showError: string = '';
  public showSuccess: string = '';
  public projHierarchies: any[] = []; 
  public urlHttpParams: any = {};
  public projHierarchy: any = {};
  public pData: any = {};
  public showSelectError: boolean = false;

  constructor(private route: ActivatedRoute, private _fb: FormBuilder, private userService: UserService, private _beService: BackendService) { 
    this.projTypeCreateEditForm = this._fb.group({
      id:[''],
      projectTypeName:['', Validators.required],
      capex:['', Validators.required],
      projectHierarchyData:['select', Validators.required],
      additionalField1:['', Validators.required],
      additionalField2:['', Validators.required]
    })
  }

  compareFn(itemOne: any, itemTwo: any): boolean {
    return itemOne && itemTwo && itemOne.id == itemTwo.id;
  }
  ngOnInit(): void {
    this.projTypeId = this.route.snapshot.params['id'];
    this.setProjHierarchies();
    

  }

  async setProjHierarchies() {
    this.projHierarchies = []
    let returnedAlerts: any = await this.setPHData();
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
      if(returnedAlerts.data.status == 200) this.projHierarchies = returnedAlerts.data.payLoad;
      if(this.projTypeId) {
        this.setEditData()
      }
      
    }
  }



  setPHData() {
    this.urlHttpParams = {
      companyId: this.userService.getCompanyID(),
      projectHierarchyId: ''  
    };
    return new Promise((resolve, reject) => {
        try {
        this._beService
          .getMethod(
            'get/project/hierarchy?',
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

  setEditData() {
    this.projTypeDetails = this.route.paramMap.pipe(map(() => window.history.state))
    this.projTypeDetails.subscribe((data: any) => this.projTypeDetails = data.data)
    //this.projHierarchy = this.projTypeDetails.projectHierarchy;
    this.projTypeCreateEditForm.patchValue(this.projTypeDetails)
    this.projTypeCreateEditForm.patchValue({projectHierarchyData: this.projTypeDetails.projectHierarchy})
    // this.projTypeCreateEditForm.controls['projectHierarchyData'].setValue((projHierarchy: any) => 
    // projHierarchy.projectHierarchyName = this.projTypeDetails.projectHierarchy.projectHierarchyName)
    // this.projTypeCreateEditForm.patchValue({
    //   projectHierarchyData: this.projTypeDetails.projectHierarchy.projectHierarchyName
    // })
  }


  async onSubmitProjTypeCreateEdit() {
    const formData = await this.projTypeCreateEditForm.getRawValue();
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
      if(returnedAlerts.data.status == 200) this.projTypeCreateEditForm.reset();
      this.showSuccess = "Data saved successfully";
      setTimeout(() => {
        this.showSuccess = '';
      },5000)
    }
  }

  postData(formData: any) {
    if(formData.projectHierarchyData == 'select') {
      this.showSelectError = true;
      return;
    } else {
      this.showSelectError = false
    }
    this.pData = formData;
    this.pData.projectHierarchy = formData.projectHierarchyData;
    this.pData.projectHierarchy.projectHierarchyName = formData.projectHierarchyData.projectHierarchyName || this.projTypeDetails.projectHierarchyName;
    this.pData.projectHierarchyId = formData.projectHierarchyData.id;
    this.pData.projectHierarchyName = formData.projectHierarchyData.projectHierarchyName || this.projTypeDetails.projectHierarchyName;
    this.pData.companyId = this.userService.getCompanyID();
    this.pData.adminId = this.userService.getUserId();
    this.pData.adminType = this.userService.getUserType();
    return new Promise((resolve, reject) => {
        try {
          this._beService.postMethod('save/project/type', this.pData)
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
