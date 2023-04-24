import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { v4 as uuidv4 } from 'uuid';
import { arrayUnion, increment } from 'firebase/firestore';
import { Subject, take } from 'rxjs';
import { Comment } from '../../common/modal'

@Injectable({
  providedIn: 'root'
})
export class CommentsReplyService {


  commentSubject = new Subject<Comment>;
  constructor(private afs: AngularFirestore, private toaster: ToastrService) { }

  addComment(message: string, id: any, name: string) {

    let documentId = uuidv4()
    let commentData: Comment =
    {
      commentId: documentId,
      username: name,
      date: new Date(),
      text: message,
      postId: id,
      replies: [],
      parentId: ''
    }

    console.log(commentData)
    this.afs.collection("postDetail").doc(id).update({
      "Comments": increment(1)
    })
    this.afs.collection("comments").doc(documentId).set(commentData).then(() => {
      console.log("Data successfully written!");
      this.commentSubject.next(commentData);
      this.toaster.success('Comment Successfull added', 'Sucesss',
        {
          titleClass: "center",
          messageClass: "center"
        })
    })
      .catch((error: any) => {
        console.error("Error writing document: ", error);
      });
  }
  addReplyToComment(commentID: string, message: string, name: string, post: string) {
    let id = uuidv4();
    let replyData: Comment =
    {
      commentId: id,
      username: name,
      date: new Date(),
      text: message,
      replies: [],
      postId: post,
      parentId: commentID
    }
    this.afs.collection("comments").doc(id).set(replyData).then(() => {

      this.commentSubject.next(replyData);
      console.log("Data successfully written!");
      this.toaster.success('Comment Successfull added', 'Sucesss',
        {
          titleClass: "center",
          messageClass: "center"
        })
    })
      .catch((error: any) => {
        console.error("Error writing document: ", error);
      });

    let commentRef: AngularFirestoreDocument<any> = this.afs.doc(`comments/${commentID}`)

    return commentRef.update({
      replies: arrayUnion(replyData)
    })
  }


  getNestedReply(postid: any) {
    return this.afs.collection('comments').doc(postid).valueChanges().pipe(take(1));
  }

  getComments() {

    return this.afs.collection("comments", ref => ref.orderBy("date", 'desc')).valueChanges().pipe()

  }
}


