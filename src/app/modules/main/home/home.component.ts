import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { InstaUserService } from 'src/app/core/service/insta-user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  loading :boolean = true ;
  public currentUserDetail = new Subject;
  constructor(private spinnerService: NgxSpinnerService , private userService : InstaUserService) {
  }
  ngOnInit(): void {

    // this.userService.getDetails().subscribe((response) => {
    //   this.currentUserDetail.next(response);
    // });
    // Start spinner 
    this.spinnerService.show();


    setTimeout(() => {
      // Hide the spinner and show the content
      this.spinnerService.hide();
      this.loading = false;
    }, 3000);
  }
}
