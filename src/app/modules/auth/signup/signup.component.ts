import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Main_Paths, REGEX } from 'src/app/common/constant';
import { EncryptioService } from 'src/app/core/service/encryptio.service';
import { FirebaseService } from 'src/app/core/service/firebase.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  isSingleClick = true;
  signUpForm!: FormGroup;
  showPassword: boolean = true;
  constructor(private fb: FormBuilder, private fireService: FirebaseService, private route: Router, private EncryptionService : EncryptioService) {
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
  ngOnInit(): void {
   
  }
  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  RegisterUser() {

    if (this.isSingleClick) {
      if (this.signUpForm.valid) {
        var encrypted = this.EncryptionService.set('123456$#@$^@1ERF', 'password@123456');
        this.fireService.SignUp(this.signUpForm.value['email'], this.signUpForm.value['password'], this.signUpForm.value)
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
