import { Component, EventEmitter, Output } from '@angular/core';
import { JoinCollectionService } from 'src/app/core/service/join-collection.service';

@Component({
  selector: 'app-comment-box',
  templateUrl: './comment-box.component.html',
  styleUrls: ['./comment-box.component.scss']
})
export class CommentBoxComponent {
  value!: string;
  @Output() add = new EventEmitter<string>();
  commentText = '';
  isEmojiPickerVisible: boolean = false;
  onSubmit(): void {

    let text = this.commentText.trim();
    this.add.emit(text);
    this.commentText = '';

  }

  addEmoji(event: any) {
    const text = `${this.commentText}${event.emoji.native}`;

    this.commentText = text;
  }

  onFocus() {
    this.isEmojiPickerVisible = false;
  }
}
