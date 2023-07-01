import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {
  post: Post;
  editPostForm = this.fb.group({
    content: ['', Validators.required],
    attachments: ['']
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditPostComponent>
  ) {
    this.post = data.post;
  }

  ngOnInit(): void {
    this.editPostForm.patchValue({
      content: this.post.content
    });
  }
  
  

  onSubmit(): void {
    if (this.editPostForm.valid) {
      const updatedPost = {
        ...this.post,
        ...this.editPostForm.value
      };
      this.dialogRef.close(updatedPost);
    }
  }
}
