import { Component } from '@angular/core';
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
  showComment: boolean = false;
  LikedUserList: Array<string> = [];
  showUnlike!: boolean;
  constructor(
    private userService: InstaUserService,
    private joinService: JoinCollectionService,
    private commentsService: CommentsReplyService,
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
      console.log(this.Posts)
    });

    this.joinService.allComments();
    this.joinService.Comments.subscribe((response: any) => {
      this.Comments = response;
    });
  }

  showLike(id: any) {
    let data = []
    for (let post of this.Posts) {
      if (post.postId === id) {
        data = post.Likes.find((user: any) => {
          return user === this.currentUserDetails.uid
        })
      }
    }
    if (data) {
      return true;
    }
    else {

      return false;
    }
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
  LikePost(postId: any, like: boolean) {
    console.log(like)
    if (!like) {
      this.userService.getLikesData(postId).subscribe((response: any) => {
        console.log(response);
        if (response) {

          this.userService.updateData(postId, this.currentUserDetails.uid, DEFAULT.TRUE, this.currentUserDetails.displayName).then(() => {
            window.location.reload();
          });
        } else {
          this.userService.updateCountOfPost(postId, this.currentUserDetails.uid, this.currentUserDetails.displayName).then(() => {
            window.location.reload();
          });
        }
      });
    } else {
      this.userService.updateData(postId, this.currentUserDetails.uid, DEFAULT.FALSE, this.currentUserDetails.displayName).then(() => {

        window.location.reload();
      });
    }
  }
  ReportPost(id: string) {
    this.userService.blockPost(id, DEFAULT.TRUE).then(() => {
      console.log('done');
    });
  }

  showCommentofPost(Id: any) {
    if (this.showComment) {
      this.showComment = false;
    }

    else {
      this.showComment = true;
    }

    this.Comments = this.Comments.filter((commentArray: any) => { return (commentArray.postId === Id && commentArray.parentId === '') })
    console.log(this.Comments)
  }

}
