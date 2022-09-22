import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from 'src/app/services/backend.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-edit-company',
  templateUrl: './create-edit-company.component.html',
  styleUrls: ['./create-edit-company.component.css']
})
export class CreateEditCompanyComponent implements OnInit {
  public value: string = ''
  public companyCreateEditForm: FormGroup

  constructor(private route: ActivatedRoute, private _fb: FormBuilder, private _beService: BackendService, private userService : UserService) { 
    this.companyCreateEditForm = this._fb.group({
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
      additionalField1: ['', Validators.required],
      additionalField2: ['', Validators.required],
      additionalField3: ['', Validators.required],
      userPlan: ['', Validators.required],
      planExpOn: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.value = this.route.snapshot.params['id'];
    if(this.value) {
    //  this.urlHttpParams = {
    //    companyName: '',
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
        companyName: 'Maruti Suzuki Private Limited',
        gstNumber: 'BX421526POM',
        address: 'One Internation Center, \nLowerParel, \nMumbai ',
        cityName: 'Mumbai',
        billingContactPersonName: 'Vikram',
        billingContactPersonNumber: '9898989898',
        saleContactPersonName: 'Chandra',
        saleContactPersonNumber: '8989898989',
        adminEmailId: 'veena@gmail.com',
        adminPhoneNumber: '1234567890',
        additionalField1: 'Test1',
        additionalField2: 'Test2',
        additionalField3: 'Test3',
        userPlan: '6 Months Best Value',
        planExpOn: new Date().toISOString().split('T')[0],
        
      }
      this.companyCreateEditForm.patchValue(x)
    }
  }

  onSubmitCompanyCreateEdit() {
    const formData = this.companyCreateEditForm.getRawValue();
    formData.planExpOn = new Date(formData.planExpOn).getTime();
    formData.id = this.value ? this.value : '';
    console.log(formData);
    // this._beService.postMethod('company/register', formData).subscribe({
    //   next: data => {
    //     console.log(data);
    //   },
    //   error: e => {
    //     console.log(e);
    //   }
    // })
  }


  numberOnly(event: any) {
    var numberStatus = this.userService.numberOnly(event);
    return numberStatus;
  }

}
