import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { BackendService } from 'src/app/services/backend.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-edit-company',
  templateUrl: './create-edit-company.component.html',
  styleUrls: ['./create-edit-company.component.css']
})
export class CreateEditCompanyComponent implements OnInit {
  public companyDetails: any = {};
  public companyCreateEditForm: FormGroup;
  public showError: string = '';
  public showSuccess: string = '';

  public pData: any = {};

  constructor(private route: ActivatedRoute, private _fb: FormBuilder, private _beService: BackendService, private userService : UserService) { 
    this.companyCreateEditForm = this._fb.group({
      id:[''],
      companyName: ['', Validators.required],
      gstNumber: ['', Validators.required],
      address: ['', Validators.required],
      cityName: ['', Validators.required],
      billingContactPersonName: ['', Validators.required],
      billingContactPersonNumber: ['', Validators.required],
      saleContactPersonName: ['', Validators.required],
      saleContactPersonNumber: ['', Validators.required],
      adminEmailId: ['', Validators.required],
      adminPhoneNumber: ['', Validators.required],
      additionalField1: [''],
      additionalField2: [''],
      additionalField3: [''],
      userPlan: ['', Validators.required],
      planExpOn: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    //this.companyDetails = JSON.parse(this.route.snapshot.params['id']);

    this.companyDetails = this.route.paramMap.pipe(map(() => window.history.state))
    this.companyDetails.subscribe((data: any) => this.companyDetails = data.data)
    if(this.companyDetails) {
      this.companyDetails.userPlan = this.companyDetails.userPlan && this.companyDetails.userPlan.split("_").join(" ").toLowerCase()
      this.companyCreateEditForm.patchValue(this.companyDetails)
    }
  }

  async onSubmitCompanyCreateEdit() {
    const formData = this.companyCreateEditForm.getRawValue();
    formData.planExpOn = new Date(formData.planExpOn).getTime();
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
      if(returnedAlerts.data.status == 200) this.companyCreateEditForm.reset();
      this.showSuccess = "Data saved successfully";
      setTimeout(() => {
        this.showSuccess = '';
      },5000)
    }
   
  }

  postData(formData: any) {
    this.pData.id = formData.id;
    this.pData.companyName = formData.companyName;
    this.pData.gstNumber = formData.gstNumber;
    this.pData.address = formData.address;
    this.pData.cityName = formData.cityName;
    this.pData.billingContactPersonName = formData.billingContactPersonName;
    this.pData.billingContactPersonNumber = formData.billingContactPersonNumber;
    this.pData.saleContactPersonName = formData.saleContactPersonName;
    this.pData.saleContactPersonNumber = formData.saleContactPersonNumber;
    this.pData.adminEmailId = formData.adminEmailId;
    this.pData.adminPhoneNumber = formData.adminPhoneNumber;
    this.pData.userPlan = "SIX_MONTH";
    return new Promise((resolve, reject) => {
        try {
          this._beService.postMethod('company/register', this.pData)
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
