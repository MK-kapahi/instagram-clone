import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { Paths } from 'src/app/common/constant';
import { RouterModule, Routes } from '@angular/router';

const route : Routes = [
  {
    path:"",redirectTo:Paths.AUTH.LOGIN ,pathMatch:'full'
  },
  {
    path : Paths.AUTH.SIGNUP , component: SignupComponent 
  },
  {
    path : Paths.AUTH.LOGIN , component: LoginComponent 
  },
  {
    path : Paths.AUTH.FORGOT_PASSWORD , component: ForgotPasswordComponent 
  },
  {
    path : Paths.AUTH.VERIFY_EMAIL , component : VerifyEmailComponent
  }

]

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    VerifyEmailComponent,
    ForgotPasswordComponent
  ],
  imports: [
    CommonModule ,
    MatIconModule,
    ReactiveFormsModule,
    RouterModule.forChild(route),
  ]
})
export class AuthModule { }
