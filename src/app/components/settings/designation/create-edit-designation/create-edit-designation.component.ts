import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { BackendService } from 'src/app/services/backend.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-edit-designation',
  templateUrl: './create-edit-designation.component.html',
  styleUrls: ['./create-edit-designation.component.css']
})
export class CreateEditDesignationComponent implements OnInit {
  public levels: string = '';
  public designationId: string = '';
  public designationDetails: any = {};
  public designationCreateEditForm: FormGroup;
  public showError: string = '';
  public showSuccess: string = '';

  constructor(private route: ActivatedRoute, private _fb: FormBuilder, private _beService: BackendService, private userService : UserService) { 
    this.designationCreateEditForm = this._fb.group({
      id:[''],
      designationName:['', Validators.required],
      level:['', Validators.required]
    })
  }

  ngOnInit(): void {
    
    // this.designationId = this.route.snapshot.params['id'];
    this.designationDetails = this.route.paramMap.pipe(map(() => window.history.state))
    this.designationDetails.subscribe((data: any) => this.designationDetails = data.data)
    this.designationCreateEditForm.patchValue(this.designationDetails)
  }

  async onSubmitDesignationCreateEdit() {
    const formData = await this.designationCreateEditForm.getRawValue();
    formData.companyId = this.userService.getCompanyID();
    formData.level = parseInt(formData.level)
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
      if(returnedAlerts.data.status == 200) this.designationCreateEditForm.reset();
      this.showSuccess = "Data saved successfully";
      setTimeout(() => {
        this.showSuccess = '';
      },5000)
    }
  }

  postData(formData: any) {
    return new Promise((resolve, reject) => {
        try {
          this._beService.postMethod('designation/save', formData)
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
