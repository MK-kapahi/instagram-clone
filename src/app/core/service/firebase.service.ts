import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { InstaUserService } from './insta-user.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getAuth } from 'firebase/auth';



const actionCodeSettings = {
  url: 'https://localhost:4200/main/login',
  handleCodeInApp: true,
};

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  userData : any ;
  authState = getAuth();

  constructor(public auth: AngularFireAuth, private afs : AngularFirestore ,private instaUser : InstaUserService , private route : Router , private toaster : ToastrService ) { 
    this.auth.authState.subscribe((user :any) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

   SignIn(email: string, password: string) {
    console.log("heyyyyyyyy")
    return this.auth
      .signInWithEmailAndPassword(email, password)
      .then(async (result:any) => {
        console.log(result.user)
        if(result.user.emailVerified)
        {
          localStorage.setItem('token',result.user._delegate.accessToken)
          localStorage.setItem('id',result.user.uid)
          this.route.navigate(['main/home']);
          this.auth.authState.subscribe();
          this.toaster.success('Logged In Successfull'," success",{
            titleClass: "center",
            messageClass: "center",
           })
        }

        else
        {
           this.toaster.warning('Please Verify Your Email '," warning",{
            titleClass: "center",
            messageClass: "center",
           })
        }
      })
      .catch((error) => {
        this.toaster.error(error.message,'Error', {
          titleClass: "center",
            messageClass: "center",
        });
      });
  }

  SignUp(email: string, password: string ,data:any) {
    return this.auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
       const user = userCredential.user
       console.log(user)
       this.toaster.success('User Registered Successfully', 'Sucesss',
          {
            titleClass: "center",
            messageClass: "center"
          })
        this.SendVerificationMail();
        console.log(userCredential);
       this.instaUser.SetUserData(user , data);
      })
      .catch((error) => {
        console.log(error)
        this.toaster.error(error.message,'Error', {
          titleClass: "center",
            messageClass: "center",
        });
      });
  }

  SendVerificationMail() {
    return this.auth.currentUser 
    .then((u: any) => 
    u.sendEmailVerification(actionCodeSettings)).then(  () => {
        this.route.navigate(['auth/verify-email-address']);
      });
  }


  ForgotPassword(passwordResetEmail: string) {
    return this.auth
      .sendPasswordResetEmail(passwordResetEmail)
      .then((result) => {
        console.log(result);
        this.toaster.info('Password reset email sent, check your inbox.', 'Sucesss',
              {
                titleClass: "center",
                messageClass: "center"
              })
      })
      .catch((error) => {
        this.toaster.error(error.message,'Error', {
          titleClass: "center",
            messageClass: "center",
        });
      });
  }

  isLoggedIn(): boolean {
    return !localStorage.getItem('token')
  }
  SignOut() {
    return this.auth.signOut().then(() => {
      this.toaster.success('Logout Successfully', 'Sucesss',
          {
            titleClass: "center",
            messageClass: "center"
          })
      localStorage.removeItem('user');
      localStorage.removeItem('id');
      localStorage.removeItem('token');
      this.route.navigate(['auth']);
    });
  }


}

