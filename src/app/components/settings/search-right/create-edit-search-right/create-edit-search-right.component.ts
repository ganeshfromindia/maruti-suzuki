import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-create-edit-search-right',
  templateUrl: './create-edit-search-right.component.html',
  styleUrls: ['./create-edit-search-right.component.css']
})
export class CreateEditSearchRightComponent implements OnInit {

  public rightTypeId: string = '';
  public rightTypeCreateEditForm: FormGroup;

  constructor(private route: ActivatedRoute, private _fb: FormBuilder) { 
    this.rightTypeCreateEditForm = this._fb.group({
      name:['', Validators.required],
      rightDesc:['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.rightTypeId = this.route.snapshot.params['id'];
    if(this.rightTypeId) {
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
        rightDesc: 'Level3',
        name: 'Prabhakar',
      }
      this.rightTypeCreateEditForm.patchValue(x)
    }

  }

  onSubmitRightTypeCreateEdit() {
    const formData = this.rightTypeCreateEditForm.getRawValue();
    console.log(formData)

  }

}
