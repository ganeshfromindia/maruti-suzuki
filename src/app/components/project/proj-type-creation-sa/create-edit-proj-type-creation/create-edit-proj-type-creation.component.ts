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
  public initPH: any = {};

  constructor(private route: ActivatedRoute, private _fb: FormBuilder, private userService: UserService, private _beService: BackendService) { 
    this.projTypeCreateEditForm = this._fb.group({
      id:[''],
      projectTypeName:['', Validators.required],
      capex:['', Validators.required],
      projectHierarchyData:[{}, Validators.required],
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

  setEditData() {
    this.projTypeDetails = this.route.paramMap.pipe(map(() => window.history.state))
    this.projTypeDetails.subscribe((data: any) => this.projTypeDetails = data.data)
    this.projHierarchy = this.projTypeDetails.projectHierarchy;
    this.projTypeCreateEditForm.patchValue(this.projTypeDetails)
    // this.projTypeCreateEditForm.controls['projectHierarchyData'].setValue((projHierarchy: any) => 
    // projHierarchy.projectHierarchyName = this.projTypeDetails.projectHierarchy.projectHierarchyName)
    // this.projTypeCreateEditForm.patchValue({
    //   projectHierarchyData: this.projTypeDetails.projectHierarchy.projectHierarchyName
    // })
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

  onSubmitProjTypeCreateEdit() {
    const formData = this.projTypeCreateEditForm.getRawValue();
    formData.projectHierarchy = formData.projectHierarchyData;
    formData.projectHierarchy.projectHierarchyName = formData.projectHierarchyData.projectHierarchyName || this.projTypeDetails.projectHierarchyName;
    formData.projectHierarchyId = formData.projectHierarchyData.id;
    formData.projectHierarchyName = formData.projectHierarchyData.projectHierarchyName || this.projTypeDetails.projectHierarchyName;
    formData.companyId = this.userService.getCompanyID();
    formData.adminId = this.userService.getUserId();
    formData.adminType = this.userService.getUserType();
  }
}
