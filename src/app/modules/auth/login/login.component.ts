import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Main_Paths, Paths, REGEX } from 'src/app/common/constant';
import { FirebaseService } from 'src/app/core/service/firebase.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isSingleClick: Boolean = true;
  loginForm: FormGroup;
  showPassword: boolean = true;
  constructor(private fb: FormBuilder, private route: Router, private fireService: FirebaseService) {

    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(REGEX.EMAIL)])],
      password: ['', Validators.compose([Validators.required, Validators.pattern(REGEX.PASSWORD)])]
    })
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }


  login() {

    if (this.isSingleClick) {
      if (this.loginForm.valid) {
        this.fireService.SignIn(this.loginForm.value['email'], this.loginForm.value['password']).then((response: any) => {
        })
      }
      else {
        Object.keys(this.loginForm.controls).forEach(key => this.loginForm.controls[key].markAsTouched({ onlySelf: true }))
      }
      this.isSingleClick = false;
    }

    setTimeout(() => {
      this.isSingleClick = true
    }, 2000)

  }

  signIn() {
    this.route.navigate([`${Main_Paths.AUTH}/${Paths.AUTH.SIGNUP}`])
  }

  moveToForgotPassword() {
    this.route.navigate([`${Main_Paths.AUTH}/${Paths.AUTH.VERIFY_EMAIL}`]);
  }
}
