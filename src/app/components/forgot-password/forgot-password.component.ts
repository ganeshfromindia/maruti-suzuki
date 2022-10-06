import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { DataService } from 'src/app/services/data.service';


interface fpDataI {
  email: string;
}

interface otpDataI {
  otp: string;
}

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit {
  alertsDismiss: any = [];
  fpForm: FormGroup;
  otpForm: FormGroup;
  rpForm: FormGroup;
  //  fpData: fpDataI;
  // otpData: otpDataI;
  showOTP: boolean = false;
  showReset: boolean = false;
  showFP: boolean = true;
  // message: string;
  alerts: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private dataService: DataService
  ) {
    this.fpForm = this.formBuilder.group({
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.minLength(3),
          Validators.maxLength(320),
        ]),
      ],
    });
    this.otpForm = this.formBuilder.group({
      otp: ['', Validators.compose([Validators.required])],
    });
    this.rpForm = this.formBuilder.group(
      {
        password: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(320),
          ]),
        ],
        cpassword: ['', Validators.compose([Validators.required])],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(frm: FormGroup) {
    return frm.controls['password'].value === frm.controls['cpassword'].value
      ? null
      : { mismatch: true };
  }

  ngOnInit(): void {}

  submit() {
    const controls = this.fpForm.controls;
    /** check form */
    // if (this.fpForm.invalid) {
    //   console.log(this.fpForm.invalid)
    // 	Object.keys(controls).forEach(controlName =>
    // 		controls[controlName].markAsTouched()
    // 	);
    // 	return;
    // }

    // this.fpData = {
    //   email: controls['email'].value,
    // };

    console.log(this.fpForm.getRawValue());

    var data = this.fpForm.getRawValue();
    let params = new HttpParams();
    params = params.append('email', data.email);

    this.dataService.sendPostRequest('send/otp', {}, params).subscribe(
      (success: any) => {
        if (success['payLoad']) {
          this.alerts.push({
            type: 'success',
            msg: `Successfully sent the OTP see your inbox`,
            timeout: 5000,
          });
          this.showOTP = true;
          this.showFP = false;
        } else {
          this.alerts.push({
            type: 'danger',
            msg: `Something went wrong please try again`,
            timeout: 5000,
          });
        }
      }
      // (err) => this.message = err.message
    );
  }

  submitOTP() {
    // const controls = this.otpForm.controls;
    // /** check form */
    // if (this.otpForm.invalid) {
    // 	Object.keys(controls).forEach(controlName =>
    // 		controls[controlName].markAsTouched()
    // 	);
    // 	return;
    // }

    // this.otpData = {
    // 	otp: controls['otp'].value,
    // };
    console.log(this.otpForm.getRawValue());
    let params = new HttpParams();
    var data = this.fpForm.getRawValue();
    var data2 = this.otpForm.getRawValue();
    params = params.append('email', data.email).append('token', data2.otp);
    console.log('params', params);
    this.dataService
      .sendGetRequest('verify/user', params)
      .subscribe((success: any) => {
        if (success['payLoad'].validateFlag) {
          this.alerts.push({
            type: 'success',
            msg: `Successfully sent the OTP see your inbox`,
            timeout: 5000,
          });
          this.showOTP = false;
          this.showReset = true;
        }
        /**
         * Checking control validation
         *
         * @param controlName: string => Equals to formControlName
         * @param validationType: string => Equals to valitors name
         */
        // isControlHasError(controlName: string, validationType: string) : boolean {
        // 	const controlfp = this.fpForm.controls[controlName];
        // 	const controlotp = this.otpForm.controls[controlName];

        //   if (!controlfp && !controlotp) {
        // 		return false;
        //   }

        //   if(controlfp) {
        //     const resultfp = controlfp.hasError(validationType) && (controlfp.dirty || controlfp.touched);
        //     return resultfp;
        //   }

        //   if(controlotp) {
        //     const resultotp = controlotp.hasError(validationType) && (controlotp.dirty || controlotp.touched);
        //     return resultotp;
        //   }
        // }
      });
  }

  ResetPassword() {
    var rawData = this.rpForm.getRawValue();
    console.log(rawData);
    var data = this.fpForm.getRawValue();
    var data2 = this.otpForm.getRawValue();
    var data3 = this.rpForm.getRawValue();

    const body = {
      validatedFlag: true,
      token: data2.otp,
      email: data.email,
      newPass: rawData.password,
      confPass: rawData.cpassword,
    };

    this.dataService.sendPostRequest('reset/password', body).subscribe(
      (data: any) => {
        if (data['message']) {
          this.router.navigate(['/login']);
          // this.alerts = this.utilservice.showSuccess(data);
          console.log(' after adding data', data['payLoad']['content']);
        } else {
          // this.userDetail = [];
        }
      },
      (error) => {
        // this.alerts = this.utilservice.showError(error);
        // this.userDetail = [];
      }
    );

    // this.router.navigate(['/login'])
    // const controls = this.rpForm.controls;
    // /** check form */
    // if (this.rpForm.invalid) {
    //   console.log(this.rpForm.invalid)
    //   Object.keys(controls).forEach(controlName =>
    //     controls[controlName].markAsTouched()
    //   );
    //   return;
    // }
    // const rpData = {
    //   // emailId: this.emailId,
    //   // otp: this.otp,
    //   newPassword: controls['password'].value,
    //   confirmPassword: controls['cpassword'].value

    // }
    // const url = "jmc/api/v1/auth/resetPassword";

    // this.dataService.sendPostRequest(url, rpData).subscribe(
    //     (success) => {
    //       this.message = success.message
    //       this.message = "SUCCESS";
    //       if(this.message == "SUCCESS") {
    //         this.alerts.push({
    //           type: 'success',
    //           msg: `Password changed successfully. Please login with same credentials`,
    //           timeout: 5000
    //         });

    //         setTimeout(() => {
    //         this.router.navigate(['/login'])
    //       }, 5000);
    //       } else {
    //         this.alerts.push({
    //           type: 'danger',
    //           msg: `Something went wrong. Please try again`,
    //           timeout: 5000
    //         });
    //       }
    //            },
    //     (err) => this.message = err.message
    //   )
  }

  /**
   * Checking control validation
   *
   * @param controlName: string => Equals to formControlName
   * @param validationType: string => Equals to valitors name
   */
  isControlHasError(controlName: string, validationType: string): boolean {
    const controlrp = this.rpForm.controls[controlName];

    if (!controlrp) {
      return false;
    }
    const resultrp =
      controlrp.hasError(validationType) &&
      (controlrp.dirty || controlrp.touched);
    return resultrp;
  }
}
