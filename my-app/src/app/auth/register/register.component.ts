import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username: string = '';
  password: string = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  register(): void {
    this.authService.register(this.username, this.password).subscribe(
      success => {
        // login após o registro bem-sucedido
        this.authService.login(this.username, this.password).subscribe(
          success => {
            // redirecionar para a página principal, adicionar seu próprio código aqui
          }
        );
      },
      error => {
        console.error('Erro ao se registrar!', error);
      }
    );
  }

}


