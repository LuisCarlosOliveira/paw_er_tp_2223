import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './auth/auth-guard.service';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ThreadListComponent } from './threads/thread-list/thread-list.component';
import { ThreadComponent } from './threads/thread/thread.component';
import { CreateThreadComponent } from './threads/create-thread/create-thread.component';
import { PostComponent } from './posts/post/post.component';
import { CreatePostComponent } from './posts/create-post/create-post.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'threads', component: ThreadListComponent, canActivate: [AuthGuardService] },
  { path: 'thread/:id', component: ThreadComponent, canActivate: [AuthGuardService] },
  { path: 'create-thread', component: CreateThreadComponent, canActivate: [AuthGuardService] },
  { path: 'thread/:id/post', component: PostComponent, canActivate: [AuthGuardService] },
  { path: 'thread/:id/create-post', component: CreatePostComponent, canActivate: [AuthGuardService] },
  { path: 'search', component: SearchComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
