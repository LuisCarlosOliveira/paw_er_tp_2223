import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  login(): void {
    this.authService.login(this.username, this.password).subscribe(
      success => {
        this.authService.storeToken(success.token);
        // redirecionar para a página principal, adicionar seu próprio código aqui
      },
      error => {
        console.error('Erro ao fazer login!', error);
      }
    );
  }

}

