import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-edit-department',
  templateUrl: './create-edit-department.component.html',
  styleUrls: ['./create-edit-department.component.css']
})
export class CreateEditDepartmentComponent implements OnInit {
  public departmentId: string = '';
  public departmentCreateEditForm: FormGroup;

  constructor(private route: ActivatedRoute, private _fb: FormBuilder) { 
    this.departmentCreateEditForm = this._fb.group({
      department:['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.departmentId = this.route.snapshot.params['id'];
    if(this.departmentId) {
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
        department: 'Finance',
      }
      this.departmentCreateEditForm.patchValue(x)
    }

  }

  onSubmitDepartmentCreateEdit() {
    const formData = this.departmentCreateEditForm.getRawValue();
    console.log(formData)

  }

}
