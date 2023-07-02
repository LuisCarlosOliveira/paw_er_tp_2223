import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './guards/auth-guard.service';
import { AdminGuard } from './guards/admin.guard';
import { UserListComponent } from './user-list/user-list.component';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { ThreadListComponent } from './threads/thread-list/thread-list.component';
import { ThreadDetailComponent } from './threads/thread-detail/thread-detail.component';
import { CreateThreadComponent } from './threads/create-thread/create-thread.component';
import { EditThreadComponent } from './threads/edit-thread/edit-thread.component';

import { PostListComponent } from './posts/post-list/post-list.component';
import { PostDetailComponent } from './posts/post-detail/post-detail.component';
import { CreatePostComponent } from './posts/create-post/create-post.component';
import { EditPostComponent } from './posts/edit-post/edit-post.component';

import { CourseListComponent } from './courses/course-list/course-list.component';
import { CourseDetailComponent } from './courses/course-details/course-details.component';
import { CourseCreateComponent  } from './courses/course-create/course-create.component';
import { CourseUpdateComponent   } from './courses/course-update/course-update.component';

import { SubjectListComponent } from './subjects/subject-list/subject-list.component';
import { SubjectDetailsComponent } from './subjects/subject-details/subject-details.component';
import { SubjectCreateComponent } from './subjects/subject-create/subject-create.component';

import { SearchComponent } from './search/search.component';

import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/courses', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'users', component: UserListComponent, canActivate: [AdminGuard] },

  { path: 'threads', component: ThreadListComponent },
  { path: 'thread/:id', component: ThreadDetailComponent},
  { path: 'create-thread', component: CreateThreadComponent, canActivate: [AuthGuardService] },
  { path: 'thread/:id/edit', component: EditThreadComponent, canActivate: [AuthGuardService] },

  { path: 'posts', component: PostListComponent },
  { path: 'post/:id', component: PostDetailComponent, canActivate: [AuthGuardService] },
  { path: 'thread/:id/create-post', component: CreatePostComponent, canActivate: [AuthGuardService] },
  { path: 'post/:id/edit', component: EditPostComponent, canActivate: [AuthGuardService] },

  { path: 'courses', component: CourseListComponent },
  { path: 'courses/:id', component: CourseDetailComponent},
  { path: 'courses/create', component: CourseCreateComponent, canActivate: [AuthGuardService] },
  { path: 'courses/update/:id', component: CourseUpdateComponent },

  { path: 'subjects/create', component: SubjectCreateComponent , canActivate: [AuthGuardService] },
  { path: 'subjects', component: SubjectListComponent },
  { path: 'subject/:id', component: SubjectDetailsComponent },

  { path: 'search', component: SearchComponent },

  { path: 'admin', component: AdminDashboardComponent, canActivate: [AuthGuardService] },

  { path: '**', redirectTo: '/courses' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

