import { Component, Input } from '@angular/core';
import { CommentsReplyService } from 'src/app/core/service/comments-reply.service';
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
  Name !: string;
  isEditing = false;
  repliesShow: boolean = false;
  NestedReply: any = []
  isEmojiPickerVisible : boolean = false;
  constructor( private commentService: CommentsReplyService , private join : JoinCollectionService ) {
  }

  id!: string;
  replyClick(commentId: any , postId :string , name : string) {
    this.isEditing = !this.isEditing;
    this.id = commentId;
    this.Postid = postId;
    this.Name = name ;
  }

  addReply() {
    this.commentService.addReplyToComment(this.id, this.replyText, this.Name , this.Postid );
    this.replyText=''
  }
  showReply(id: any) {
    this.repliesShow = true;
    this.commentService.getNestedReply(id).subscribe((response: any) => {
      for (let reply of response.replies) {
        this.join.NestedComments(reply.commentId)
        this.join.nestedComments.subscribe((response :any)=>{
         console.log("join nested response", response)
          this.NestedReply.push(...response);
        })
      }
    })

  }

  addEmoji(event: any) {
  
    const text = `${this.replyText}${event.emoji.native}`;
    console.log(this.replyText);
    }

    onFocus() {
      this.isEmojiPickerVisible = false;
    }
}
