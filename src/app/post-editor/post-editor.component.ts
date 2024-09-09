import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-post-editor',
  templateUrl: './post-editor.component.html',
  styleUrls: ['./post-editor.component.scss'],
})
export class PostEditorComponent implements OnInit {
  @Input() post: any;
  @Output() savePost = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  onSave() {
    this.savePost.emit(this.post);
  }
}
