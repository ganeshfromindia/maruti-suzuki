import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { BackendService } from 'src/app/services/backend.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-edit-department',
  templateUrl: './create-edit-department.component.html',
  styleUrls: ['./create-edit-department.component.css']
})
export class CreateEditDepartmentComponent implements OnInit {
  public departmentDetails: any = {};
  public departmentCreateEditForm: FormGroup;
  public showError: string = '';
  public showSuccess: string = '';

  constructor(private route: ActivatedRoute, private _fb: FormBuilder, private _beService: BackendService, private userService : UserService) { 
    this.departmentCreateEditForm = this._fb.group({
      id:[''],
      companyId: [''],
      departmentName:['', Validators.required]
    })
  }

  ngOnInit(): void {
    //this.departmentId = this.route.snapshot.params['id'];
      this.departmentDetails = this.route.paramMap.pipe(map(() => window.history.state))
      this.departmentDetails.subscribe((data: any) => this.departmentDetails = data.data)
      this.departmentCreateEditForm.patchValue(this.departmentDetails)

  }

  async onSubmitDepartmentCreateEdit() {
    const formData = this.departmentCreateEditForm.getRawValue();
    formData.companyId = formData.companyID || sessionStorage.getItem("companyID") || 2;
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
      if(returnedAlerts.data.status == 200) this.departmentCreateEditForm.reset();
      this.showSuccess = "Data saved successfully";
      setTimeout(() => {
        this.showSuccess = '';
      },5000)
    }
  }

  postData(formData: any) {
    return new Promise((resolve, reject) => {
        try {
          this._beService.postMethod('department/save', formData)
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
