import { Component, NgModule } from '@angular/core';
import { Client, User, UserDTO } from '../../api/api-client';
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-users-component',
  standalone: true,
  imports: [CommonModule, FormsModule, 
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
  ],
  templateUrl: './users-component.component.html',
  styleUrls: ['./users-component.component.css']  // תוקן כאן
})
export class UsersComponentComponent {
  isAddingNewUser = false; 
  users: UserDTO[] = [];
  newUser: UserDTO = new UserDTO();
  editMode: number | null = null;
  editUserDetails: UserDTO = new UserDTO();
  displayedColumns: string[] = ['userName', 'userEmail', 'userRole', 'actions'];

  constructor(private userClient: Client) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  cancelAdd(): void {
    this.isAddingNewUser = false;
    this.newUser = new UserDTO();
  }

  loadUsers(): void {
    this.userClient.userAll().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (err) => {
        console.error('Error loading users', err);
      }
    });
  }

  addUser(): void {
    this.userClient.userPOST(this.newUser).subscribe({
      next: (user) => {
        this.users.push(user);
        this.newUser = new UserDTO();
        this.isAddingNewUser = false; // אפשר גם להסתיר את הטופס אחרי הוספה
      },
      error: (err) => {
        alert('שגיאה בהוספת משתמש: ' + err.message);
      }
    });
  }

  editUser(user: UserDTO): void {
    this.editMode = user.userId ?? null;
    this.editUserDetails = Object.assign(new UserDTO(), user);
  }

  updateUser(): void {
    if (this.editMode !== null) {
      this.userClient.userPUT(this.editMode, this.editUserDetails).subscribe({
        next: () => {
          this.editMode = null;
          this.editUserDetails = new UserDTO();
          this.loadUsers();
        },
        error: (err) => {
          alert('שגיאה בעדכון משתמש: ' + err.message);
        }
      });
    }
  }

  cancelEdit(): void {
    this.editMode = null;
    this.editUserDetails = new UserDTO();
  }

  deleteUser(id: number): void {
    if (confirm('את בטוחה שברצונך למחוק משתמש זה?')) {
      this.userClient.userDELETE(id).subscribe(() => {
        this.loadUsers();
      });
    }
  }
}
