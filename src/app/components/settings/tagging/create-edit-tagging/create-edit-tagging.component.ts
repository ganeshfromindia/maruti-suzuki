import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-edit-tagging',
  templateUrl: './create-edit-tagging.component.html',
  styleUrls: ['./create-edit-tagging.component.css']
})
export class CreateEditTaggingComponent implements OnInit {

  public taggingId: string = '';
  public taggingCreateEditForm: FormGroup;

  constructor(private route: ActivatedRoute, private _fb: FormBuilder) { 
    this.taggingCreateEditForm = this._fb.group({
      tagName:['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.taggingId = this.route.snapshot.params['id'];
    if(this.taggingId) {
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
        tagName: 'MOM',
      }
      this.taggingCreateEditForm.patchValue(x)
    }

  }

  onSubmitTaggingCreateEdit() {
    const formData = this.taggingCreateEditForm.getRawValue();
    console.log(formData)

  }

}
