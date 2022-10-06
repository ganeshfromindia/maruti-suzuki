import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { BackendService } from "src/app/services/backend.service";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  alerts: any = [];
  

  loginForm!: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private _beService: BackendService
  ) {}

  ngOnInit(): void {
    !!sessionStorage.getItem("authToken") && this.userService.logout();
    this.loginForm = this.formBuilder.group({
      id: [""],
      email: ["", Validators.required],
      Password: ["", Validators.required],
    });
  }

  login() {
    var loginDetail = this.loginForm.getRawValue();
    
    

    this._beService.postMethod("auth/login?userName=" + loginDetail.email +"&password="+ loginDetail.Password + "&userType=SUPER_ADMIN" , {}).subscribe({
      next: (data: any): void => {
        console.log(data.payLoad.authToken);
        console.log(data.payLoad.data.companyId);
        this.userService.setAuthToken(data.payLoad.authToken);
        this.userService.setcompanyID(data.payLoad.data.companyId);
        this.userService.setUserID(data.payLoad.data.id);
        this.router.navigate(["/company"]);
      },
      error: (error: any): void => {
        console.log(error);
        if (!!error.error.message) alert(`:: Error ::\n${error.error.message}`);
        else if (error.status == 500) alert(`:: Error ::\nIncorrect access credentials.`);
        else alert(`:: Error ::\nThe system reported some error. Please contact your system administrator.`);
      },
    });
  }
}
