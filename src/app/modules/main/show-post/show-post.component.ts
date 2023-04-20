import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { DEFAULT } from 'src/app/common/constant';
import { CommentsReplyService } from 'src/app/core/service/comments-reply.service';
import { InstaUserService } from 'src/app/core/service/insta-user.service';
import { JoinCollectionService } from 'src/app/core/service/join-collection.service';

@Component({
  selector: 'app-show-post',
  templateUrl: './show-post.component.html',
  styleUrls: ['./show-post.component.scss']
})
export class ShowPostComponent {
  currentUserDetails: any = [];
  LikedUserList: Array<string> = [];
  showUnlike!: boolean;
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
      console.log(response)
    });

    this.joinService.allComments();
    this.joinService.Comments.subscribe((response: any) => {
      console.log(response)
      this.Comments= response
    });
  }
  onSubmit($event: any, id: any) {
    console.log($event);
    this.messageTobeCommented = $event;
    this.commentsService.addComment(
      this.messageTobeCommented,
      id,
      this.currentUserDetails.displayName
    );

    console.log('Done');
  }
  LikePost(postId: any, like: boolean, post: any) {
    if (!like) {
      this.userService.getLikesData(postId).subscribe((response: any) => {
        console.log(response);
        if (response) {

          this.userService.updateData(postId, this.currentUserDetails.uid, DEFAULT.TRUE, this.currentUserDetails.displayName).then(() => {
            post?.Likes.push(this.currentUserDetails?.uid)
            post?.Names.push(this.currentUserDetails?.displayName);
          });
        } else {
          this.userService.updateCountOfPost(postId, this.currentUserDetails.uid, this.currentUserDetails.displayName).then(() => {
            post?.Likes.push(this.currentUserDetails?.uid)
            post?.Names.push(this.currentUserDetails?.displayName)
          });
        }
      });
    } else {
      post?.Likes.splice(post.Likes?.indexOf(this.currentUserDetails?.uid), 1)
      post?.Names.splice(post.Names?.indexOf(this.currentUserDetails?.displayName), 1)
      this.userService.updateData(postId, this.currentUserDetails.uid, DEFAULT.FALSE, this.currentUserDetails.displayName).then(() => {
      });
    }
  }
  ReportPost(id: string) {
    this.userService.blockPost(id, DEFAULT.TRUE).then(() => {
      console.log('done');
    });
  }

  showComment(post:any) {
    if (post.showComment) {
      post.showComment = false;
    }

    else {
      post.showComment = true;
    }
  }

}
