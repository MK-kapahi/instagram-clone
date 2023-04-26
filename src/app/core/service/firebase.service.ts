import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { InstaUserService } from './insta-user.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getAuth } from 'firebase/auth';
import { DEFAULT, Main_Paths, Paths } from 'src/app/common/constant';
import * as bcrypt from "bcryptjs";
import { take } from 'rxjs';



const actionCodeSettings = {
  url: 'https://feedstoryapp-25fc5.web.app/auth/login',
  handleCodeInApp: true,
};

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  userData: any;
  authState = getAuth();

  constructor(public auth: AngularFireAuth, private afs: AngularFirestore, private instaUser: InstaUserService, private route: Router, private toaster: ToastrService) {
    this.auth.authState.subscribe((user: any) => {
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


   SignIn(email: string, password: string ,user:any) {
  
       if (bcrypt.compareSync(password , user?.password)) {
        return this.auth
          .signInWithEmailAndPassword(email,user?.password)
          .then( (result: any) => {
            console.log(result.user)
            if (result.user.emailVerified) {
              localStorage.setItem('token', result.user._delegate.accessToken)
              localStorage.setItem('id', result.user.uid)
              this.route.navigate([`${Main_Paths.MAIN}/${Paths.MAIN.HOME}`]);
              this.auth.authState.subscribe();
              this.toaster.success('Logged In Successfull', " success", {
                titleClass: "center",
                messageClass: "center",
              })
            }

            else {
              this.toaster.warning('Please Verify Your Email ', " warning", {
                titleClass: "center",
                messageClass: "center",
              })
            }
          })
          .catch((error) => {
            this.toaster.error(error.message, 'Error', {
              titleClass: "center",
              messageClass: "center",
            });
          });
      }

      else {
        this.toaster.error("PLease Enter Valid Password", 'Error', {
          titleClass: "center",
          messageClass: "center",
        });
        return
      }
    
  }

  SignUp(email: string, data: any) {
    const encryptHash = bcrypt.hashSync(data.password,DEFAULT.HASH_VALUE)
    return this.auth
      .createUserWithEmailAndPassword(email, encryptHash)
      .then((userCredential) => {
        const user = userCredential.user
        this.instaUser.SetUserData(user, data ,encryptHash);
        this.toaster.success('User Registered Successfully', 'Sucesss',
          {
            titleClass: "center",
            messageClass: "center"
          })
        this.SendVerificationMail();
      })
      .catch((error) => {
        console.log(error)
        this.toaster.error(error.message, 'Error', {
          titleClass: "center",
          messageClass: "center",
        });
      });
  }

  SendVerificationMail() {
    return this.auth.currentUser
      .then((u: any) => {
        u.sendEmailVerification(actionCodeSettings)
      }).then(() => {
        this.route.navigate([`${Main_Paths.AUTH}/${Paths.AUTH.VERIFY_EMAIL}`]);
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

        this.route.navigate([Main_Paths.AUTH]);
      })
      .catch((error) => {
        this.toaster.error(error.message, 'Error', {
          titleClass: "center",
          messageClass: "center",
        });
      });
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
      this.route.navigate([Main_Paths.AUTH]);
    });
  }


  AllUsers()
  {
    return this.afs.collection("users").valueChanges().pipe(take(1))
  }
}

