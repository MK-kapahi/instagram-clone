import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Main_Paths, REGEX } from 'src/app/common/constant';
import { FirebaseService } from 'src/app/core/service/firebase.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  isSingleClick = true;
  signUpForm!: FormGroup;
  showPassword: boolean = true;
  constructor(private fb: FormBuilder, private fireService: FirebaseService, private route: Router, private toaster: ToastrService) {
    this.signUpForm = this.fb.group({
      displayName: ['', Validators.compose([Validators.required, Validators.pattern(REGEX.USERNAME)])],
      email: ['', Validators.compose([Validators.required, Validators.pattern(REGEX.EMAIL)])],
      password: ['', Validators.compose([Validators.required, Validators.pattern(REGEX.PASSWORD)])]
    })

    this.signUpForm.controls["email"].valueChanges.subscribe(()=>{
      this.isSingleClick =true;
    })
    this.signUpForm.controls["password"].valueChanges.subscribe(()=>{
      this.isSingleClick= true
    })
  }
  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  RegisterUser() {

    if (this.isSingleClick) {
      if (this.signUpForm.valid) {
        this.fireService.SignUp(this.signUpForm.value['email'], this.signUpForm.value)
        this.signUpForm.reset();
      }


      else {

        Object.keys(this.signUpForm.controls).forEach(key => this.signUpForm.controls[key].markAsTouched({ onlySelf: true }))
      }

      this.isSingleClick=false;
    }


    // setTimeout(()=>{
    //   this.isSingleClick=true;
    // },2000)
  }

  login() {
    this.route.navigate([Main_Paths.AUTH])
  }

}
