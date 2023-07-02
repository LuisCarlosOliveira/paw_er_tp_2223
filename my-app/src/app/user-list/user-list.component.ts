import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = ['username', 'role', 'isBlocked', 'actions'];
  dataSource: User[] = [];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers().subscribe((users: User[]) => {
      this.dataSource = users;
    });
  }

  updateUser(user: User, data: Partial<User>): void {
    this.userService.updateUser(user._id, data).subscribe(() => {
      this.getUsers();
    });
  }

  deleteUser(user: User): void {
    this.userService.deleteUser(user._id).subscribe(() => {
      this.getUsers();
    });
  }
  blockUser(user: User): void {
    this.updateUser(user, { isBlocked: true });
  }
  

  unblockUser(user: User): void {
    this.updateUser(user, { isBlocked: false });
  }

  changeRole(user: User, newRole: string): void {
    this.updateUser(user, { role: newRole });
  }
}

