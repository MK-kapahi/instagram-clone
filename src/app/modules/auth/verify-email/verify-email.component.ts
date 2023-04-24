import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Main_Paths } from 'src/app/common/constant';
import { FirebaseService } from 'src/app/core/service/firebase.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent {
  constructor(public authService : FirebaseService , private route : Router){}
  login()
  {
    this.route.navigate([`${Main_Paths.AUTH}`])
  }

  sendVerificationEmail()
  {
    this.authService.SendVerificationMail()
  }
}
