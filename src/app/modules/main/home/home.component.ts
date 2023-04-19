import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  loading :boolean = true ;
  constructor(private spinnerService: NgxSpinnerService) {
  }
  ngOnInit(): void {
    // Start spinner 
    this.spinnerService.show();


    setTimeout(() => {
      // Hide the spinner and show the content
      this.spinnerService.hide();
      this.loading = false;
    }, 3000);
  }
}
