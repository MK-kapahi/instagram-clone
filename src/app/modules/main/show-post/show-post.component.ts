import { Component, OnInit } from '@angular/core';
import { DEFAULT } from 'src/app/common/constant';
import { CommentsReplyService } from 'src/app/core/service/comments-reply.service';
import { InstaUserService } from 'src/app/core/service/insta-user.service';
import { JoinCollectionService } from 'src/app/core/service/join-collection.service';

@Component({
  selector: 'app-show-post',
  templateUrl: './show-post.component.html',
  styleUrls: ['./show-post.component.scss']
})
export class ShowPostComponent implements OnInit {
  isSingleClick = true;
  currentUserDetails: any = [];
  LikedUserList: Array<string> = [];
  showUnlike!: boolean;
  selectedEmoji!: string;
  isEmojiPickerVisible : boolean = false;
  constructor(
    private userService: InstaUserService,
    private joinService: JoinCollectionService,
    private commentsService: CommentsReplyService
  ) {
    this.userService.getDetails().subscribe((response) => {
      this.currentUserDetails = response;
    });
  }
  messageTobeCommented: string = '';
  Posts: any = [];
  Comments: any = [];
  ngOnInit(): void {
    this.joinService.AllPost();
    this.joinService.commentsWithPostsAndUsers.subscribe((response: any) => {
      this.Posts = response;
    });
    this.initcommentSection()

  }
  initcommentSection() {
    this.joinService.allComments();
    this.joinService.Comments.subscribe((response: any) => {
      this.Comments = response;
    });
  }


  onSubmit($event: any, id: any, post: any) {
    console.log($event);
    this.messageTobeCommented = $event;
    this.commentsService.addComment(
      this.messageTobeCommented,
      id,
      this.currentUserDetails.displayName
    );

    this.commentsService.getComments().subscribe((res: any) => {
      console.log("comments", res)
      this.Comments = res;
    });
  }
  LikePost(postId: any, like: boolean, post: any,) {
    if (this.isSingleClick) {
      if (!like) {
        this.userService.getLikesData(postId).subscribe((response: any) => {
          // this.selectedEmoji = event.emoji.native;
          console.log(response);
          if (response) {

            this.userService.updateData(postId, this.currentUserDetails.uid, DEFAULT.TRUE, this.currentUserDetails.displayName ).then(() => {
              post?.Likes.push(this.currentUserDetails?.uid)
              post?.Names.push(this.currentUserDetails?.displayName);
            });
          } else {
            post?.Likes.push(this.currentUserDetails?.uid)
            post?.Names.push(this.currentUserDetails?.displayName)
            this.userService.updateCountOfPost(postId, this.currentUserDetails.uid, this.currentUserDetails.displayName, )
          }
        });
      } else {
        post?.Likes.splice(post.Likes?.indexOf(this.currentUserDetails?.uid), 1)
        post?.Names.splice(post.Names?.indexOf(this.currentUserDetails?.displayName), 1)
        this.userService.updateData(postId, this.currentUserDetails.uid, DEFAULT.FALSE, this.currentUserDetails.displayName ).then(() => {
        });
      }
      this.isSingleClick = false;
    }

    setTimeout(() => {
      this.isSingleClick = true
    }, 2000)

  }
  ReportPost(id: string) {
    this.userService.blockPost(id, DEFAULT.TRUE).then(() => {
      console.log('done');
    });
  }

  addEmoji(event: any) {
    this.selectedEmoji = event.emoji.native;
    //console.log(event.emoji.native


    }
}
