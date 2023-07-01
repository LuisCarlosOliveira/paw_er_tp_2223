import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ThreadService } from '../../services/thread.service';
import { PostService } from '../../services/post.service';
import { Thread } from '../../models/thread.model';
import { Post } from '../../models/post.model';
import { Location } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { EditPostComponent } from '../../posts/edit-post/edit-post.component';
import { MatDialog } from '@angular/material/dialog';
import { ChangeDetectorRef } from '@angular/core';





@Component({
  selector: 'app-thread-detail',
  templateUrl: './thread-detail.component.html',
  styleUrls: ['./thread-detail.component.css']
})
export class ThreadDetailComponent implements OnInit {
  thread!: Thread;
  posts!: Post[];
  postForm!: FormGroup;
  fileToUpload!: File;

  constructor(
    private route: ActivatedRoute,
    private threadService: ThreadService,
    private postService: PostService,
    private authService: AuthService,
    private fb: FormBuilder,
    private location: Location,
    private changeDetectorRef: ChangeDetectorRef,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getThread();
    this.getPosts();
    this.createForm();
  }

  createForm(): void {
    this.postForm = this.fb.group({
      content: ['', Validators.required],
      attachments: this.fb.array([]),
    });
  }



  onSubmit(): void {
    if (this.postForm.valid && this.thread?._id) {
      const newPost: Post = this.postForm.value;
      newPost.thread = this.thread._id;
      this.postService.createPost(newPost).subscribe(() => this.getPosts());
      this.postForm.reset();
    }
  }

  getThread(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.threadService.getThreadById(id).subscribe(thread => this.thread = thread);
    }
  }

  getPosts(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.threadService.getPostsByThreadId(id).subscribe(posts => this.posts = posts);
    }
  }

  downloadFile(data: ArrayBuffer, name: string): string {
    let blob = new Blob([new Uint8Array(data)], { type: "octet/stream" });
    let url = window.URL.createObjectURL(blob);
    return url;
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  get canCreatePost(): boolean {
    return this.authService.canCreatePost();
  }

  goBack(): void {
    this.location.back();
  }

  onFileChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    const fileArray = this.postForm.get('attachments') as FormArray;

    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const fileGroup = this.fb.group({
          file: [files[i]],
          name: [files[i].name]
        });
        fileArray.push(fileGroup);
      }
    }
  }



  upvotePost(post: Post): void {
    this.postService.upvotePost(post._id).subscribe(() => this.getPosts());
  }

  downvotePost(post: Post): void {
    this.postService.downvotePost(post._id).subscribe(() => this.getPosts());
  }

  canVote(post: Post): boolean {
    const currentUser = this.authService.currentUserValue;
    if (!currentUser) {
      return false;
    }
    const userId = currentUser._id;
    if (post.creator === userId) {
      return false;
    }
    return !post.voters.includes(userId);
  }


  isPostCreator(post: Post): boolean {
    const userId = this.authService.currentUserValue._id;
    return post.creator === userId;
  }


  refreshPosts(): void {
    if (this.thread && this.thread._id) {
      this.postService.getPostsByThreadId(this.thread._id).subscribe(
        posts => this.posts = posts,
        error => console.error(error)
      );
    }
  }

  editPost(post: Post): void {
    const dialogRef = this.dialog.open(EditPostComponent, {
      data: { post: post }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.postService.editPost(result).subscribe(
          (updatedPost) => {
            const index = this.posts.findIndex(p => p._id === updatedPost._id);
            if (index !== -1) {
              this.posts[index] = updatedPost;
            }
          },
          error => console.error(error)
        );
      }
    });
  }
  

  toggleHidePost(post: Post) {
    this.postService.toggleHidePost(post._id).subscribe(updatedPost => {
      // Atualizar o post no array de posts
      let index = this.posts.findIndex(p => p._id === updatedPost._id);
      this.posts[index] = updatedPost;
    }, err => {
      console.error(err);
    });
  }

  isModeratorOrAdmin(): boolean {
    const role = this.authService.getRole();
    return role === 'moderator' || role === 'admin';
  }

  deletePost(post: Post): void {
    this.postService.deletePost(post._id).subscribe(() => {
      this.posts = this.posts.filter(p => p._id !== post._id);
      this.changeDetectorRef.detectChanges();
    }, err => {
      console.error(err);
    });
  }


}