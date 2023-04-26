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

    this.loginForm.controls["email"].valueChanges.subscribe(() => {
      this.isSingleClick = true;
    })

    this.loginForm.controls["password"].valueChanges.subscribe(() => {
      this.isSingleClick = true;
    })
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }


   login() {

    let UserDetails = {}
    if (this.isSingleClick) {
      
      this.fireService.AllUsers().subscribe((res: any) => {
      UserDetails = res.find((arr: any) => { return arr.email === this.loginForm.value['email'] })
      if (this.loginForm.valid) {
        
        this.fireService.SignIn(this.loginForm.value['email'], this.loginForm.value['password'], UserDetails)
      }
      else {
        Object.keys(this.loginForm.controls).forEach(key => this.loginForm.controls[key].markAsTouched({ onlySelf: true }))
      }
    })
      this.isSingleClick = false;
    }


  }

  signIn() {
    this.route.navigate([`${Main_Paths.AUTH}/${Paths.AUTH.SIGNUP}`])
  }

  moveToForgotPassword() {
    this.route.navigate([`${Main_Paths.AUTH}/${Paths.AUTH.FORGOT_PASSWORD}`]);
  }
}
