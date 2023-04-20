import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InstaUserService } from 'src/app/core/service/insta-user.service';
import { JoinCollectionService } from 'src/app/core/service/join-collection.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  uid: string = "";
  Image = "";
  Bio :string= "";
  User: any = [];
  displayStyle = "none";
  CurrentUserPost: any = [];
  isEmojiPickerVisible: boolean = false;
  constructor(private userService: InstaUserService, private join: JoinCollectionService , private route : Router) {
    this.userService.getDetails().subscribe((response) => {
      this.uid = response.uid
      this.User.push(response);
      console.log(this.User)
    });
  }
  ngOnInit(): void {
    this.join.UserPost()
    this.join.currentUserPost.subscribe((response) => {
      console.log(response);
      this.CurrentUserPost = response;
    })
  }

  // Updating Profile image and Bio 
  uploadProfileImage(event :any)
  {
    let file = event.target.files[0];
    console.log(file);
    this.userService.uploadImage(file).subscribe((res:any)=>{
  })
  this.userService.Url.subscribe((response)=>{
    this.Image= response
  })
}

// For opening Modal
  openPopup() {
    this.displayStyle = "block";
    let div = document.getElementsByClassName('modal')[0];
    div.classList.add('show');
  
  }

  // For Closing Modal 
  closePopup() {
    let div = document.getElementsByClassName('modal')[0];
    div.classList.remove('show');
    this.displayStyle = "none";
  }

  saveChanges(uid :string)
  {
    this.userService.updateProfile(uid ,this.Image, this.Bio).then(()=>{
      this.route.navigate(["main/home"])
    })
    let div = document.getElementsByClassName('modal')[0];
    div.classList.remove('show');
    this.displayStyle = "none";
  }

  // For adding emoji to the dicription message 
  addEmoji(event: any) {
    console.log(`${event.emoji.native}`)
    const text = `${this.Bio}${event.emoji.native}`;

    this.Bio = text;
    }
       
    onFocus() {
      this.isEmojiPickerVisible = false;
    }
}
