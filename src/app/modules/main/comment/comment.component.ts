import { Component, Input } from '@angular/core';
import { CommentsReplyService } from 'src/app/core/service/comments-reply.service';
import { InstaUserService } from 'src/app/core/service/insta-user.service';
import { JoinCollectionService } from 'src/app/core/service/join-collection.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent {
  replyText: any;
  @Input() comment: any;
   Postid: any;
  isEditing = false;
  repliesShow: boolean = false;
  NestedReply: any = [];
  currentUserDetail :any =[];
  Comments : any =[]
  isEmojiPickerVisible : boolean = false;
  constructor( private commentService: CommentsReplyService , private joinService : JoinCollectionService , private userService : InstaUserService) {
    this.userService.getDetails().subscribe((response) => {
      this.currentUserDetail = response
    });
  }

  id!: string;
  replyClick(commentId: any , postId :string) {
    this.isEditing = !this.isEditing;
    this.id = commentId;
    this.Postid = postId;
  }

  addReply() {
    let text= this.replyText.trim();
    this.commentService.addReplyToComment(this.id,text, this.currentUserDetail.displayName , this.Postid );
    this.replyText='';
  }
  showReply(id: any) {
    if(this.repliesShow)
    {
      this.repliesShow = false;
    }

    else
    {

      this.repliesShow = true;
    this.commentService.getNestedReply(id).subscribe((response: any) => {
      for (let reply of response.replies) {
        this.joinService.NestedComments(reply.commentId)
        this.joinService.nestedComments.subscribe((response :any)=>{
          this.NestedReply.push(...response);
        })
      }
    })
  }
  }

  // Adding emoji to reply 
  addEmoji(event: any) {
  
    const text = `${this.replyText}${event.emoji.native}`;
    console.log(this.replyText);
    }

    onFocus() {
      this.isEmojiPickerVisible = false;
    }
}
