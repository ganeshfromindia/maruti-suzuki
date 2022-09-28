import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-create-edit-doc-type-creation',
  templateUrl: './create-edit-doc-type-creation.component.html',
  styleUrls: ['./create-edit-doc-type-creation.component.css']
})
export class CreateEditDocTypeCreationComponent implements OnInit {

  public docTypeId: string = '';
  public docTypeCreateEditForm: FormGroup;

  constructor(private route: ActivatedRoute, private _fb: FormBuilder) { 
    this.docTypeCreateEditForm = this._fb.group({
      docType:['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.docTypeId = this.route.snapshot.params['id'];
    if(this.docTypeId) {
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
        docType: 'Project Schedule',
      }
      this.docTypeCreateEditForm.patchValue(x)
    }

  }

  onSubmitDocTypeCreateEdit() {
    const formData = this.docTypeCreateEditForm.getRawValue();
    console.log(formData)

  }

}
