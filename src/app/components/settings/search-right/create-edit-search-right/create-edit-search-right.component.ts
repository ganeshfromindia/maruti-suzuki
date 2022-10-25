import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { BackendService } from 'src/app/services/backend.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-create-edit-search-right',
  templateUrl: './create-edit-search-right.component.html',
  styleUrls: ['./create-edit-search-right.component.css']
})
export class CreateEditSearchRightComponent implements OnInit {
  public rightsDetails: any = {};
  public rightTypeCreateEditForm: FormGroup;
  public showError: string = '';
  public showSuccess: string = '';

  constructor(private route: ActivatedRoute, private _fb: FormBuilder, private _beService: BackendService, private userService : UserService) { 
    this.rightTypeCreateEditForm = this._fb.group({
      id:[''],
      name:['', Validators.required],
      description:['', Validators.required]
    })
  }

  ngOnInit(): void {
    //this.departmentId = this.route.snapshot.params['id'];
      this.rightsDetails = this.route.paramMap.pipe(map(() => window.history.state))
      this.rightsDetails.subscribe((data: any) => this.rightsDetails = data.data)
      this.rightTypeCreateEditForm.patchValue(this.rightsDetails)

  }

  async onSubmitRightTypeCreateEdit() {
    const formData = await this.rightTypeCreateEditForm.getRawValue();
    formData.companyId = this.userService.getCompanyID();
    formData.adminId = this.userService.getUserId();
    let returnedAlerts: any = await this.postData(formData);
    if(returnedAlerts.flag) {
      if(returnedAlerts.data.status == 404) {
        this.showError = "Data Not Found";
      } else if(returnedAlerts.data.status == 409) {
        this.showError = "Duplicate Entry";
      } else {
        this.showError = "Something went wrong";
      }
      setTimeout(() => {
        this.showError = '';
      },5000)
    } else {
      if(returnedAlerts.data.status == 200) this.rightTypeCreateEditForm.reset();
      this.showSuccess = "Data saved successfully";
      setTimeout(() => {
        this.showSuccess = '';
      },5000)
    }
  }

  postData(formData: any) {
    return new Promise((resolve, reject) => {
        try {
          this._beService.postMethod('common/system/rights', formData)
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
