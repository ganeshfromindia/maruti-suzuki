import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BackendService } from 'src/app/services/backend.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userCreateEditForm: FormGroup;
  role: string = ''

  constructor(private _fb: FormBuilder, private _beService: BackendService, private userService: UserService) { 
    this.userCreateEditForm = this._fb.group({
      companyName:['', Validators.required],
      userName:['', Validators.required],
      department:['', Validators.required],
      designation:['', Validators.required],
      emailId:['', Validators.required],
      phoneNumber:['', Validators.required],
      level:['', Validators.required],
      userType:['', Validators.required],
      searchRights:['', Validators.required],
      additionalField:['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.role = sessionStorage.getItem("role") || '';
    this.role = 'superadmin';
  }
  onSubmitUserCreateEdit() {

  }
}
