import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-edit-proj-type-creation',
  templateUrl: './create-edit-proj-type-creation.component.html',
  styleUrls: ['./create-edit-proj-type-creation.component.css']
})
export class CreateEditProjTypeCreationComponent implements OnInit {

  public projTypeId: string = '';
  public projTypeCreateEditForm: FormGroup;

  constructor(private route: ActivatedRoute, private _fb: FormBuilder) { 
    this.projTypeCreateEditForm = this._fb.group({
      projTypeName:['', Validators.required],
      capex:['', Validators.required],
      projHierarchy:['', Validators.required],
      additionalField1:['', Validators.required],
      additionalField2:['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.projTypeId = this.route.snapshot.params['id'];
    if(this.projTypeId) {
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
        projTypeName: 'Large Capex Project',
        capex: 'More than 200 Crore',
        projHierarchy: 'Big Project Hierarchy',
        additionalField1: 'Investors Involved',
        additionalField2: 'Technology Status',
      }
      this.projTypeCreateEditForm.patchValue(x)
    }

  }

  onSubmitProjTypeCreateEdit() {
    const formData = this.projTypeCreateEditForm.getRawValue();
    console.log(formData)

  }
}
