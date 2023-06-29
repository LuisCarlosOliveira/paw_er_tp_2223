import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';

import { AuthService } from './auth/auth.service';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

import { NavbarComponent } from './navbar/navbar.component';

import { DashboardComponent } from './dashboard/dashboard.component';

import { CourseService } from './services/course.service';
import { CourseListComponent } from './courses/course-list/course-list.component';
import { CourseDetailsComponent } from './courses/course-details/course-details.component';


import { SubjectService } from './services/subject.service';
import { SubjectListComponent } from './subjects/subject-list/subject-list.component';
import { SubjectDetailsComponent } from './subjects/subject-details/subject-details.component';

import { ThreadsService } from './threads/threads.service';
import { ThreadListComponent } from './threads/thread-list/thread-list.component';
import { ThreadDetailComponent } from './threads/thread-detail/thread-detail.component';
import { CreateThreadComponent } from './threads/create-thread/create-thread.component';
import { EditThreadComponent } from './threads/edit-thread/edit-thread.component';

import { PostsService } from './posts/posts.service';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostDetailComponent } from './posts/post-detail/post-detail.component';
import { CreatePostComponent } from './posts/create-post/create-post.component';
import { EditPostComponent } from './posts/edit-post/edit-post.component';

import { SearchComponent } from './search/search.component';

//import { AdminService } from './admin/admin.service';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';

import { JwtInterceptor } from './auth/jwt.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { CourseCreateComponent } from './courses/course-create/course-create.component';
import { CourseUpdateComponent } from './courses/course-update/course-update.component';
import { SubjectCreateComponent } from './subjects/subject-create/subject-create.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    DashboardComponent,
    CourseListComponent,
    CourseDetailsComponent,
    SubjectListComponent,
    SubjectDetailsComponent,
    ThreadListComponent,
    ThreadDetailComponent,
    CreateThreadComponent,
    EditThreadComponent,
    PostListComponent,
    PostDetailComponent,
    CreatePostComponent,
    EditPostComponent,
    SearchComponent,
    AdminDashboardComponent,
    CourseCreateComponent,
    CourseUpdateComponent,
    SubjectCreateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    AuthService,
    CourseService,
    SubjectService,
    ThreadsService,
    PostsService,
    //AdminService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
