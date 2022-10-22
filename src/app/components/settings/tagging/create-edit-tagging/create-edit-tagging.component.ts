import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { BackendService } from 'src/app/services/backend.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-edit-tagging',
  templateUrl: './create-edit-tagging.component.html',
  styleUrls: ['./create-edit-tagging.component.css']
})
export class CreateEditTaggingComponent implements OnInit {

  public taggingId: string = '';
  public taggingCreateEditForm: FormGroup;
  public taggingDetails: any = {}
  public showError: string = '';
  public showSuccess: string = '';

  constructor(private route: ActivatedRoute, private _fb: FormBuilder, private _beService: BackendService, private userService : UserService) { 
    this.taggingCreateEditForm = this._fb.group({
      id:[''],
      taggingHeadName:['', Validators.required]
    })
  }

  ngOnInit(): void {
    // this.taggingId = this.route.snapshot.params['id'];
    this.taggingDetails = this.route.paramMap.pipe(map(() => window.history.state))
    this.taggingDetails.subscribe((data: any) => this.taggingDetails = data.data)
    this.taggingCreateEditForm.patchValue(this.taggingDetails)
    }


  async onSubmitTaggingCreateEdit() {
    const formData = this.taggingCreateEditForm.getRawValue();
    formData.adminType = this.userService.getUserType();
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
      if(returnedAlerts.data.status == 200) this.taggingCreateEditForm.reset();
      this.showSuccess = "Data saved successfully";
      setTimeout(() => {
        this.showSuccess = '';
      },5000)
    }
  }

  postData(formData: any) {
    return new Promise((resolve, reject) => {
        try {
          this._beService.postMethod('common/tagging/head', formData)
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
