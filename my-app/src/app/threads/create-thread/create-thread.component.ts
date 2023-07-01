import { Component, OnInit } from '@angular/core';
import { ThreadService } from '../../services/thread.service';
import { Thread } from '../../models/thread.model';

@Component({
  selector: 'app-create-thread',
  templateUrl: './create-thread.component.html',
  styleUrls: ['./create-thread.component.css']
})
export class CreateThreadComponent implements OnInit {
  thread: Thread = {
    title: '',
    content: '',
    attachments: [],
    tags: [],
    creator: '',
    posts: [],
    hidden: false,
    course: '',
    subject: ''
  };

  constructor(private threadService: ThreadService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.threadService.createThread(this.thread).subscribe(
      response => {
        console.log('Thread created', response);

      },
      error => {
        console.log('Error:', error);
      }
    );
  }
}
