import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BackendService } from 'src/app/services/backend.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-create-edit-user',
  templateUrl: './create-edit-user.component.html',
  styleUrls: ['./create-edit-user.component.css']
})
export class CreateEditUserComponent implements OnInit {

  userCreateEditForm: FormGroup;
  role: string = '';
  companies: any[] = [];
  departments: any[] = [];
  designations: any[] = [];
  levels: any[] = [];
  types: any[] = [];

  constructor(private _fb: FormBuilder, private _beService: BackendService, private userService: UserService) { 
    this.userCreateEditForm = this._fb.group({
      companyName:[null, Validators.required],
      userName:['', Validators.required],
      department:[null, Validators.required],
      designation:[null, Validators.required],
      emailId:['', Validators.required],
      phoneNumber:['', Validators.required],
      level:[null, Validators.required],
      userType:[null, Validators.required],
      searchRights:['', Validators.required],
      additionalField:['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.role = sessionStorage.getItem("role") || '';
    this.role = 'superadmin';
    this.companies = [
      {id:1 , companyName: 'Azetec'},
      {id:2 , companyName: 'Boron'},
      {id:3 , companyName: 'Myosis'},
      {id:4 , companyName: 'Ploti'},
      {id:5 , companyName: 'Lumpos'}
    ]
    this.departments = [
      {id:1 , departmentName: 'Azetec'},
      {id:2 , departmentName: 'Boron'},
      {id:3 , departmentName: 'Myosis'},
      {id:4 , departmentName: 'Ploti'},
      {id:5 , departmentName: 'Lumpos'}
    ]
    this.designations = [
      {id:1 , designation: 'Azetec'},
      {id:2 , designation: 'Boron'},
      {id:3 , designation: 'Myosis'},
      {id:4 , designation: 'Ploti'},
      {id:5 , designation: 'Lumpos'}
    ]
    this.levels = [
      {id:1 , level: 1},
      {id:2 , level: 2},
      {id:3 , level: 3},
      {id:4 , level: 4},
      {id:5 , level: 5}
    ]
    this.types = [
      {id:1 , type: 'Azetec'},
      {id:2 , type: 'Boron'},
      {id:3 , type: 'Myosis'},
      {id:4 , type: 'Ploti'},
      {id:5 , type: 'Lumpos'}
    ]
  }
  onSubmitUserCreateEdit() {
    const formData = this.userCreateEditForm.getRawValue();
    console.log(formData);
  }

  numberOnly(event: any) {
    var numberStatus = this.userService.numberOnly(event);
    return numberStatus;
  }
}
