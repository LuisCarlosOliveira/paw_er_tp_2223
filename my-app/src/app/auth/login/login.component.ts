import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  login(): void {
    this.authService.login(this.username, this.password).subscribe(
      success => {
        this.router.navigateByUrl('/courses');
      },
      error => {
        console.error('Login Failed', error);
        if (error.status === 403 && error.error === 'Your account is blocked.') {
          alert('Blocked Account');
        } else {
          alert('Login Failed');
        }
      }
    );
  }

}

