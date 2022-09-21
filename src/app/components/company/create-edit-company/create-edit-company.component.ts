import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-edit-company',
  templateUrl: './create-edit-company.component.html',
  styleUrls: ['./create-edit-company.component.css']
})
export class CreateEditCompanyComponent implements OnInit {
  public value: string = ''
  public companyCreateEditForm: FormGroup

  constructor(private route: ActivatedRoute, private _fb: FormBuilder) { 
    this.companyCreateEditForm = this._fb.group({
      name: ['', Validators.required],
      gstNo: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      cPBilling: ['', Validators.required],
      cPBillingMob: ['', Validators.required],
      cPSales: ['', Validators.required],
      cPSalesMob: ['', Validators.required],
      adminEI: ['', Validators.required],
      adminEIMob: ['', Validators.required],
      addField1: ['', Validators.required],
      addField2: ['', Validators.required],
      addField3: ['', Validators.required],
      userPlan: ['', Validators.required],
      planExpOn: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.value = this.route.snapshot.params['id'];
    let time = new Date().getTime()
    if(this.value) {
      let x = {
        name: 'Maruti Suzuki Private Limited',
        gstNo: 'BX421526POM',
        address: 'One Internation Center, \nLowerParel, \nMumbai ',
        city: 'Mumbai',
        cPBilling: 'Vikram',
        cPBillingMob: '9898989898',
        cPSales: 'Chandra',
        cPSalesMob: '8989898989',
        adminEI: 'veena@gmail.com',
        adminEIMob: '1234567890',
        addField1: 'Test1',
        addField2: 'Test2',
        addField3: 'Test3',
        userPlan: '6 Months Best Value',
        planExpOn: new Date().toISOString().split('T')[0],
        
      }
      this.companyCreateEditForm.patchValue(x)
    }
  }

  onSubmitcompanyCreateEdit() {

  }

}
