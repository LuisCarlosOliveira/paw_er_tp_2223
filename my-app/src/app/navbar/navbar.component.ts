import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  role: string = '';
  username: string = '';


  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.currentUser.subscribe(user => {
      if(user) {
        this.isLoggedIn = true;
        this.role = user.role;
        this.username = user.username;
      } else {
        this.isLoggedIn = false;
        this.role = '';
        this.username = '';
      }
    });
  }

  logout() {
    this.authService.logout();
  }
}
