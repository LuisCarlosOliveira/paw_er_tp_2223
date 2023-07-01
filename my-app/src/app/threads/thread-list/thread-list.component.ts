import { Component, OnInit } from '@angular/core';
import { ThreadService } from '../../services/thread.service';
import { AuthService } from '../../services/auth.service';
import { Thread } from '../../models/thread.model';

@Component({
  selector: 'app-thread-list',
  templateUrl: './thread-list.component.html',
  styleUrls: ['./thread-list.component.css']
})
export class ThreadListComponent implements OnInit {

  threads: Thread[] = [];

  constructor(private threadService: ThreadService, public authService: AuthService) { }

  ngOnInit(): void {
    this.loadThreads();
  }

  loadThreads(): void {
    this.threadService.getThreads().subscribe(
      data => {
        this.threads = data;
      },
      error => {
        console.log('Error:', error);
      }
    );
  }

  deleteThread(id: string): void {
    this.threadService.deleteThread(id).subscribe(
      () => {
        this.threads = this.threads.filter(thread => thread._id !== id);
      },
      error => {
        console.log('Error:', error);
      }
    );
  }
  
}
