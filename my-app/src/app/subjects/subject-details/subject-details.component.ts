import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubjectService } from '../../services/subject.service';
import { ThreadService } from '../../services/thread.service';
import { Subject } from '../../models/subject.model';
import { Thread } from '../../models/thread.model';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-subject-details',
  templateUrl: './subject-details.component.html',
  styleUrls: ['./subject-details.component.css']
})
export class SubjectDetailsComponent {
  subject!: Subject;
  threads!: Thread[];
  threadForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private subjectService: SubjectService,
    private threadService: ThreadService,
    private authService: AuthService,
    private router: Router,
    private location: Location,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getSubject();
    this.getThreads();
    this.threadForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  getSubject(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.subjectService.getSubjectById(id).subscribe(subject => this.subject = subject);
    }
  }

  getThreads(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.threadService.getThreadsBySubjectId(id).subscribe(threads => this.threads = threads);
    }
  }

  navigateToThread(thread: Thread): void {
    if (thread._id) {
      this.router.navigate([`/thread/${thread._id}`]);
    }
  }

  goBack(): void {
    this.location.back();
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  get canCreateThread(): boolean {
    return this.authService.canCreateThread();
  }

  createThread(newThread: Thread): void {
    if (!this.subject._id) {
      console.error('Subject ID is not defined');
      return;
    }

    newThread.subject = this.subject._id;

    this.threadService.createThread(newThread)
      .subscribe(
        (thread: Thread) => {
          this.threads.push(thread);
        },
        (error: any) => {
          console.error('Error creating thread:', error);
        }
      );

    this.threadForm.reset();
  }

  hideThread(thread: Thread): void {
    if (thread._id && this.canHideThread(thread)) {
      thread.hidden = !thread.hidden;
      this.threadService.toggleHideThread(thread._id).subscribe(
        () => this.getThreads(),
        error => console.error(error)
      );
    }
  }


  deleteThread(thread: Thread): void {
    if (thread._id) {
      this.threadService.deleteThread(thread._id).subscribe(
        () => this.getThreads(),
        error => console.error(error)
      );
    }
  }

  canHideThread(thread: Thread): boolean {
    const role = this.authService.getRole();
    const userId = this.authService.currentUserValue._id;

    return role === 'admin' || role === 'moderator' || (role === 'user' && thread.creator == userId);
  }

  canDeleteThread(thread: Thread): boolean {
    const role = this.authService.getRole();

    return role === 'admin' || role === 'moderator';
  }

}
