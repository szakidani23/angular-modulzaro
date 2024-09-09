import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  posts: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  /// Loading Posts via API
  loadPosts() {
    this.http.get('https://dummyjson.com/posts').subscribe((data: any) => {
      this.posts = data.posts;
    });
  }

  /// Delete post locally
  deletePost(postId: number) {
    this.posts = this.posts.filter((post) => post.id !== postId);
  }
  /// Edit post locally
  editPost(post: any) {}
  /// Save post locally
  savePost() {}
}
