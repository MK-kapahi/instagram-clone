import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Main_Paths } from 'src/app/common/constant';
import { FirebaseService } from 'src/app/core/service/firebase.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  constructor( private route :Router , private fireService :FirebaseService ) {}

  onSubmit(data:NgForm)
    {
        let email = data.value.email;
        console.log(email)
      
        this.fireService.ForgotPassword(data.value.email);

        setTimeout(() => {
          
          this.route.navigate([Main_Paths.AUTH]);
        }, 2000);

    }

    login()
    {
      this.route.navigate([Main_Paths.AUTH])
    }
}
