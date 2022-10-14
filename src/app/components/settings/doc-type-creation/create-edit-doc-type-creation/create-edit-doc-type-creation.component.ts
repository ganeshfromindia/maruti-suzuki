import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { BackendService } from 'src/app/services/backend.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-create-edit-doc-type-creation',
  templateUrl: './create-edit-doc-type-creation.component.html',
  styleUrls: ['./create-edit-doc-type-creation.component.css']
})
export class CreateEditDocTypeCreationComponent implements OnInit {

  public docTypeId: string = '';
  public docDetails: any = {};
  public showError: string = '';
  public showSuccess: string = '';
  public docTypeCreateEditForm: FormGroup;

  constructor(private route: ActivatedRoute, private _fb: FormBuilder, private _beService: BackendService, private userService : UserService) { 
    this.docTypeCreateEditForm = this._fb.group({
      id:[''],
      documentType:['', Validators.required]
    })
  }

  ngOnInit(): void {
    // this.docTypeId = this.route.snapshot.params['id'];
    this.docDetails = this.route.paramMap.pipe(map(() => window.history.state))
    this.docDetails.subscribe((data: any) => this.docDetails = data.data)
    this.docTypeCreateEditForm.patchValue(this.docDetails);
  }

  async onSubmitDocTypeCreateEdit() {
    const formData = await this.docTypeCreateEditForm.getRawValue();
    formData.companyId = this.userService.getCompanyID();
    formData.adminId = this.userService.getUserId();
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
      if(returnedAlerts.data.status == 200) this.docTypeCreateEditForm.reset();
      this.showSuccess = "Data saved successfully";
      setTimeout(() => {
        this.showSuccess = '';
      },5000)
    }
  }

  postData(formData: any) {
    return new Promise((resolve, reject) => {
        try {
          this._beService.postMethod('common/document/type', formData)
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
