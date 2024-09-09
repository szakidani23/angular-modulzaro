import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  posts: any[] = [];
  selectedPost: any = null;

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

  /// Edit post locally
  editPost(post: any) {
    // scroll to top when clicked
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    this.selectedPost = { ...post };
  }
  /// Save post locally
  savePost(updatedPost: any) {
    const postIndex = this.posts.findIndex((p) => p.id === updatedPost.id);
    if (postIndex > -1) {
      this.posts[postIndex] = updatedPost;
    }
    this.selectedPost = null;
  }

  // Simulating API put - Also changes the postcontent on save
  updatePost(post: any) {
    this.http.put(`https://dummyjson.com/posts/${post.id}`, post).subscribe(
      (response) => {
        // Update the post in the local posts array
        const postIndex = this.posts.findIndex((p) => p.id === post.id);
        if (postIndex > -1) {
          this.posts[postIndex] = response;
        }
        console.log('Post updated successfully:', response);
        this.selectedPost = null; // Close the edit form after saving
      },
      (error) => {
        console.log('Failed to update post:', error);
      }
    );
  }

  // Simulating API delete || Also deletes the Post locally
  deletePost(postId: number) {
    this.http.delete(`https://dummyjson.com/posts/${postId}`).subscribe(
      (response) => {
        this.posts = this.posts.filter((post) => post.id !== postId);
        console.log('Post deleted successfully');
      },
      (error) => {
        console.log('Failed to delete post:', error);
      }
    );
  }
}
