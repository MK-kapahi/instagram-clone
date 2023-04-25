import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument, DocumentData } from '@angular/fire/compat/firestore';
import { arrayUnion, increment, arrayRemove } from 'firebase/firestore';
import { LikedEmoji, LikesModal, Post, PostModal, User } from '../../common/modal';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { getAuth } from 'firebase/auth';
import { finalize, of, Subject, take } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DEFAULT, Main_Paths } from '../../common/constant';
import { v4 as uuidv4 } from 'uuid';


@Injectable({
  providedIn: 'root'
})
export class InstaUserService {

  auth = getAuth();
  userDetails = new Subject<DocumentData>
  GetPost = new Subject<DocumentData>
  PostOFAuser = new Subject<DocumentData>
  CommentsSubject = new Subject;
  private uploadProgressSubject = new Subject<any>();
  Url = new Subject<string>
  constructor(private route: Router, public afs: AngularFirestore, public Fireauth: AngularFireAuth, private store: AngularFireStorage, private toaster: ToastrService) {
  }
  SetUserData(user: any, data: any, password: string) {
    const userData: User = {
      uid: user.uid,
      email: data.email,
      displayName: data.displayName,
      photoURL: DEFAULT.PROFILE,
      password: password,
    };
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    return userRef.set(userData, {
      merge: true,
    })


  }

  getDetails() {
    const uid: any = localStorage.getItem('id');

    let document = this.afs.doc<any>('users/' + uid);
    return document.valueChanges().pipe(take(1));
  }
  uploadImage(File: any) {
    const filePath = `images/${Date.now()}_${File.name}`;
    const fileRef = this.store.ref(filePath);
    const task = fileRef.put(File);
    task.percentageChanges()
      .subscribe((percent) => {
        this.uploadProgressSubject.next(percent);
      })
    return task.snapshotChanges().pipe(
      finalize(() => {
        let downloadURL = fileRef.getDownloadURL();
        downloadURL.subscribe((url: any) => {
          if (url) {
            this.Url.next(url);
          }
        });
      })
    );
  }

  uploadVideo(file: any) {
    const vedioPath = `videos/${Date.now()}_${file.name}`;
    const storageRef = this.store.ref(vedioPath);
    const task = storageRef.put(file)
    task.percentageChanges()
      .subscribe((percent) => {
        this.uploadProgressSubject.next(percent);
      })
    return task.snapshotChanges().pipe(
      finalize(() => {
        let downloadURL = storageRef.getDownloadURL();
        downloadURL.subscribe((url: any) => {
          if (url) {
            this.Url.next(url);
          }
        });
      })
    );
  }

  uploadProgressObservable() {
    return this.uploadProgressSubject.asObservable();
  }
  addPost(userId: string, discription: any, url: any, type: number) {
    const id = uuidv4()
    const postdetails: Post =
    {
      postId: id,
      Url: url,
      Type: type,
      createdAt: new Date(),
      Block: false,
      Description: discription,
      isLiked: false,
      likes: 0,
      Comments: 0,
      updateAt: new Date()
    }
    console.log(postdetails)
    const Postdata: PostModal = {
      uid: userId,
      postId: id
    };
    const postRef: AngularFirestoreDocument<any> = this.afs.doc(
      `posts/${id}`
    );

    this.setPostData(postdetails, id)
    return postRef.set(Postdata, {
      merge: true,
    }).then(() => {
      this.toaster.success('image Posted  successfull', " success", {
        titleClass: "center",
        messageClass: "center",
      })
      this.route.navigate([Main_Paths.MAIN])
    }).catch((error) => {
      console.log(error)
    })

  }

  setPostData(PostDetails: Post, id: any) {
    const postDetailRef: AngularFirestoreDocument<any> = this.afs.doc(
      `postDetail/${id}`
    );

    return postDetailRef.set(PostDetails, {
      merge: true,
    })
  }



  updateCountOfPost(postid: any, userID: string, name: string, emoji: string) {
      let LikeData: LikesModal =
      {
        postId: postid,
        likedUserId: [userID],
        Likedusername: [name],
      }

      this.afs.collection("Likes").doc(postid).set(LikeData).then(() => {
        console.log("done")
      })

      console.log(LikeData)
      this.afs.collection("postDetail").doc(postid).update({
        "likes": increment(1),
        "updateAt": new Date(),
      })
      this.afs.collection("Likes").doc(postid).set(LikeData).then(() => {
        console.log("done")
      })
    
  }

  getLikesData(postid: string) {
    return this.afs.doc<any>('Likes/' + postid).valueChanges().pipe(take(1));
  }

  updateData(postid: any, userId: string, like: boolean, name: string, emoji: string, emojiId: string) {

    const Id = uuidv4()
    let LikedEmojiData: LikedEmoji =
    {
      EmojiId: Id,
      Emoji: emoji,
      PostId: postid
    }

    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `Likes/${postid}`
    );

    if (like) {
      this.afs.collection("postDetail").doc(postid).update({
        "likes": increment(1)
      })
      return userRef.update({
        likedUserId: arrayUnion(userId),
        Likedusername: arrayUnion(name),
      })

    }

    else {
      this.afs.collection("postDetail").doc(postid).update({
        "likes": increment(-1)
      })

      return userRef.update({
        likedUserId: arrayRemove(userId),
        Likedusername: arrayRemove(name),
      }).then(() => {
        console.log("removed Sucessfylly")
      })

    }

  }

  blockPost(id: string, report: boolean) {
    if (report) {
      return this.afs.collection("postDetail").doc(id).update({
        "Block": true
      })
    }

    else {
      return this.afs.collection("postDetail").doc(id).update({
        "Block": false
      })
    }
  }
  updateProfile(uid: string, image: string, bio: string) {

    return this.afs.collection("users").doc(uid).update({
      "Bio": bio,
      "photoURL": image
    }).then(() => {
      this.toaster.success('Profile update successfull', " success", {
        titleClass: "center",
        messageClass: "center",
      })
    })
  }
}
