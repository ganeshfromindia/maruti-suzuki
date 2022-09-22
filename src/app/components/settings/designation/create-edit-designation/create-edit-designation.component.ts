import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-edit-designation',
  templateUrl: './create-edit-designation.component.html',
  styleUrls: ['./create-edit-designation.component.css']
})
export class CreateEditDesignationComponent implements OnInit {
  public levels: any[] = [];
  public designationId: string = '';
  public designationCreateEditForm: FormGroup;
  constructor(private route: ActivatedRoute, private _fb: FormBuilder) { 
    this.designationCreateEditForm = this._fb.group({
      designation:['', Validators.required],
      level:['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.levels = [
      {id:1 , level: 1},
      {id:2 , level: 2},
      {id:3 , level: 3},
      {id:4 , level: 4},
      {id:5 , level: 5}
    ]
    this.designationId = this.route.snapshot.params['id'];
    if(this.designationId) {
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
        designation: 'Finance',
        level: 2
      }
      this.designationCreateEditForm.patchValue(x)
    }

  }

  onSubmitDesignationCreateEdit() {
    const formData = this.designationCreateEditForm.getRawValue();
    console.log(formData)

  }
}
