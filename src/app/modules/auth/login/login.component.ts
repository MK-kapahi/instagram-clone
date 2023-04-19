import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { REGEX } from 'src/app/common/constant';
import { FirebaseService } from 'src/app/core/service/firebase.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  
  loginForm : FormGroup ;
  showPassword: boolean = false;
  constructor(private fb : FormBuilder , private route : Router , private fireService : FirebaseService ) {
    
    this.loginForm = this.fb.group({
      email :['',Validators.compose([Validators.required , Validators.pattern(REGEX.EMAIL)])],
      password : ['' ,Validators.compose([Validators.required, Validators.pattern(REGEX.PASSWORD)])]
    })
    }
    
    public togglePasswordVisibility(): void {
      this.showPassword = !this.showPassword;
    }
    
  
  login() {
    if(this.loginForm.valid)
    {
      console.log("heyyyy")
        this.fireService.SignIn(this.loginForm.value['email'], this.loginForm.value['password']).then((response:any)=>{
        })
    }
    else
    {
      Object.keys(this.loginForm.controls).forEach(key=>this.loginForm.controls[key].markAsTouched({onlySelf:true}))
    }
  }

  signIn()
  {
    this.route.navigate(['auth/sign-up'])
  }

  moveToForgotPassword()
  {
   this.route.navigate(['forgot']);
  }
}
