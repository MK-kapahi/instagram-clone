import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Main_Paths, REGEX } from 'src/app/common/constant';
import { FirebaseService } from 'src/app/core/service/firebase.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {

  isSingleClick: boolean = true;
  EmailPattern = REGEX.EMAIL;
  emailForm!: NgForm;
  errorShow: boolean = false;
  constructor(private route: Router, private fireService: FirebaseService,) {
  }

  onSubmit(data: NgForm) {

    if (this.isSingleClick) {
      if (data.value.email) {

        this.fireService.ForgotPassword(data.value.email);
        this.isSingleClick = false;
      }

      else {
        this.errorShow = true;
      }
    }
  }

  login() {
    this.route.navigate([Main_Paths.AUTH])
  }

  emailEntered() {
    this.isSingleClick = true;
    this.errorShow= false;
  }
}
