import { Component } from '@angular/core';
import { DEFAULT } from 'src/app/common/constant';
import { User } from 'src/app/common/modal';
import { CommentsReplyService } from 'src/app/core/service/comments-reply.service';
import { InstaUserService } from 'src/app/core/service/insta-user.service';
import { JoinCollectionService } from 'src/app/core/service/join-collection.service';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss']
})
export class BlockComponent {
  currentUserDetails!: User;
  uid : string =''
  showComment: boolean = false;
  LikedUserList: Array<string> = [];
  showUnlike!: boolean;
  constructor(
    private userService: InstaUserService,
    private joinService: JoinCollectionService
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

    this.joinService.allComments();
    this.joinService.Comments.subscribe((response: any) => {
      this.Comments = response;
    });
  }

  
  // showCommentofPost(Id: any) {
  //   if (this.showComment) {
  //     this.showComment = false;
  //   }

  //   else {
  //     this.showComment = true;
  //   }

  //   this.Comments = this.Comments.filter((commentArray: any) => { return (commentArray.postId === Id && commentArray.parentId === '') })
  // }

  unReportPost(id : any)
  {
    this.userService.blockPost(id , DEFAULT.FALSE)
  }
}
