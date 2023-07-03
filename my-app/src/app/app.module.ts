import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';

import { AppComponent } from './app.component';

import { AuthService } from './services/auth.service';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

import { UserService } from './services/user.service';
import { UserListComponent } from './user-list/user-list.component';

import { NavbarComponent } from './navbar/navbar.component';

import { CourseService } from './services/course.service';
import { CourseListComponent } from './courses/course-list/course-list.component';
import { CourseDetailComponent } from './courses/course-details/course-details.component';


import { SubjectService } from './services/subject.service';
import { SubjectListComponent } from './subjects/subject-list/subject-list.component';
import { SubjectDetailsComponent } from './subjects/subject-details/subject-details.component';

import { ThreadService } from './services/thread.service';
import { ThreadListComponent } from './threads/thread-list/thread-list.component';
import { ThreadDetailComponent } from './threads/thread-detail/thread-detail.component';
import { CreateThreadComponent } from './threads/create-thread/create-thread.component';
import { EditThreadComponent } from './threads/edit-thread/edit-thread.component';

import { PostService } from './services/post.service';
import { EditPostComponent } from './posts/edit-post/edit-post.component';

import { SearchComponent } from './search/search.component';

import { JwtInterceptor } from './auth/jwt.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    CourseListComponent,
    CourseDetailComponent,
    SubjectListComponent,
    SubjectDetailsComponent,
    ThreadListComponent,
    ThreadDetailComponent,
    CreateThreadComponent,
    EditThreadComponent,
    EditPostComponent,
    SearchComponent,
    UserListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatTableModule,
    MatListModule,
    BrowserAnimationsModule,
    MatSelectModule
  ],
  providers: [
    AuthService,
    CourseService,
    SubjectService,
    ThreadService,
    PostService,
    UserService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
