import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) { } 

  ngOnInit(): void {
  }

  register(): void {
    this.authService.register(this.username, this.password).subscribe(
      success => {
        // login após o registro bem-sucedido
        this.authService.login(this.username, this.password).subscribe(
          success => {
            this.router.navigateByUrl('/courses'); // redireciona para a página inicial
          },
          error => {
            console.error('Login Failed!', error);
            alert('Login Failed');
          }
        );
      },
      error => {
        console.error('Register failed', error);
        alert('Register failed');
      }
    );
  }

}