import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { REGEX } from 'src/app/common/constant';
import { FirebaseService } from 'src/app/core/service/firebase.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signUpForm!: FormGroup;
  showPassword: boolean =false;
  validateDateOfbirth: boolean =false;
  constructor(private fb : FormBuilder, private fireService : FirebaseService ,private route : Router ,private toaster : ToastrService){
    this.signUpForm = this.fb.group({
      displayName :['',Validators.compose([Validators.required , Validators.pattern(REGEX.USERNAME)])],
      email:['', Validators.compose([Validators.required,Validators.pattern(REGEX.EMAIL)])],
      password:['',Validators.compose([Validators.required,Validators.pattern(REGEX.PASSWORD)])]
    })
  }
  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  
  Replace(event :any) {
    event.target.value = event.target.value.replace(/[^0-9]/g, '')
  }
  RegisterUser() {
   if(this.signUpForm.valid)
   {
    console.log(this.signUpForm.value);
        this.fireService.SignUp(this.signUpForm.value['email'] , this.signUpForm.value['password'], this.signUpForm.value)}
        

   else{
    
      Object.keys(this.signUpForm.controls).forEach(key=>this.signUpForm.controls[key].markAsTouched({onlySelf:true}))
   }
  }

  login()
  {
      this.route.navigate(['auth/login'])
  }

  inputValue(event :any)
  {
      console.log(event.target.value)
  }
}
