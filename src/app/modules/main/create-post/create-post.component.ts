import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, map, of } from 'rxjs';
import { DEFAULT } from 'src/app/common/constant';
import { InstaUserService } from 'src/app/core/service/insta-user.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent {
  FileUpload!: any
  discriptionMessage : string = '';
  User : any =[] 
  URL : any ;
  Posts : any =[]
  Type : number = DEFAULT.IMAGE ;
  isEmojiPickerVisible: boolean = false;
  uploadPercent!: Observable<number>;
  constructor(public userService : InstaUserService , private toaster :ToastrService){

  }
  ngOnInit(): void {
 this.userService.getDetails().subscribe((response) => {
      this.User = response;

    });
  }
    PostData()
    {
      this.userService.addPost( this.User.uid,this.discriptionMessage,this.URL, this.Type ).then((response)=>{
        console.log(response)
      })
    }

    
    SelectImage(event: any)
    {

      this.FileUpload = event.target.files[0];

      if(this.FileUpload.type==='video/mp4')
      {
        this.userService.uploadVideo(this.FileUpload).subscribe();
        this.userService.Url.subscribe((res)=>{
          this.URL = res;
          this.Type = DEFAULT.VEDIO;
        })
        this.uploadPercent = this.userService.uploadProgressObservable().pipe(map((progress: number) => progress))
      }
      else if(this.FileUpload.type==='image/jpeg'){
        this.userService.uploadImage(this.FileUpload).subscribe((res:any)=>{})
        this.userService.Url.subscribe((res)=>{
          this.URL = res;
        })
        this.uploadPercent = this.userService.uploadProgressObservable().pipe(map((progress: number) => progress))
      }

      else 
      {
        this.toaster.warning("Invalid Post are not allowed", "Warning", {
          titleClass: "center",
            messageClass: "center",
        });
      }
    }   

    getProgress(): Observable<number> {
      return this.uploadPercent ? this.uploadPercent.pipe(
        map(progress => {
          if (progress !== undefined && progress !== null) {
            return +progress.toFixed(2);
          } else {
            return 0;
          }
        })
      ) : of(0);
    }

    addEmoji(event: any) {
    const text = `${this.discriptionMessage}${event.emoji.native}`;
    this.discriptionMessage = text;
    }
       
    onFocus() {
      this.isEmojiPickerVisible = false;
    }
}
