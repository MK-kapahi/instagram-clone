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

  loading: boolean = true;
  public currentUserDetail = new Subject;
  constructor(private spinnerService: NgxSpinnerService,) {
  }
  ngOnInit(): void {

    this.spinnerService.show();


    setTimeout(() => {
      this.spinnerService.hide();
      this.loading = false;
    }, 3000);
  }
}
