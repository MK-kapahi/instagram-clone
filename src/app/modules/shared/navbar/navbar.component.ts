import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Main_Paths, Paths } from 'src/app/common/constant';
import { FirebaseService } from 'src/app/core/service/firebase.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(private service: FirebaseService, private route: Router) { }
  Home = () => {
    this.route.navigate([Main_Paths.MAIN])
  }
  Logout = () => {
    this.service.SignOut()
  }
  CrestePost = () => {
    this.route.navigate([`${Main_Paths.MAIN}/${Paths.MAIN.HOME}/${Paths.MAIN.CREATE}`])
  }

  Profile = () => { this.route.navigate([`${Main_Paths.MAIN}/${Paths.MAIN.HOME}/${Paths.MAIN.PROFILE}`]) }

  Block = () => {
    this.route.navigate([`${Main_Paths.MAIN}/${Paths.MAIN.HOME}/${Paths.MAIN.BLOCK}`])
  }

  navButton = [
    { display: ' home', action: this.Home },
    { display: ' Post ', action: this.CrestePost },
    { display: ' Profile', action: this.Profile },
    { display: ' Block', action: this.Block },
    { display: ' Logout', action: this.Logout },
  ]
}
