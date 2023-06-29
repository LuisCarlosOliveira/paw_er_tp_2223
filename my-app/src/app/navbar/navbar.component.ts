import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service'


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  currentUser: any;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.currentUser.subscribe((user: any) => this.currentUser = user);
  }

  logout() {
    this.authService.logout();
  }
}
