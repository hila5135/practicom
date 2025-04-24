import { Component, NgModule } from '@angular/core';
import { Client, User, UserDTO } from '../../api/api-client';
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users-component',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './users-component.component.html',
  styleUrl: './users-component.component.css'
})
export class UsersComponentComponent {
  isAddingNewUser = false; 
  // users: UserDTO[] = [];
//   editMode: number | null = null;  // מחזיק את ה-ID של המשתמש שנמצא בעריכה
//   editUserDetails: UserDTO = new UserDTO();  // המשתמש שנמצא בעריכה

//   constructor(private userClient: Client) {}

//   ngOnInit(): void {
//     this.loadUsers();
//   }

//   loadUsers(): void {
//     this.userClient.userAll().subscribe(data => {
//       this.users = data;
//     });
//   }

//   // עריכת משתמש
//   editUser(user: UserDTO): void {
//     this.editMode = user.userId ?? null;  // שומרת את ה-ID של המשתמש לעריכה
//     this.editUserDetails = Object.assign(new UserDTO(), user);
//   }
//   // עדכון משתמש
//   updateUser(): void {
//     if (this.editMode !== null) {
//       this.userClient.userPUT(this.editMode, this.editUserDetails).subscribe({
//         next: () => {
//           this.editMode = null;  // מסיימת את מצב העריכה
//           this.editUserDetails = new UserDTO();  // מאפסת את הנתונים לעריכה
//           this.loadUsers();  // טוענת את רשימת המשתמשים מחדש
//         },
//         error: (err) => {
//           alert('שגיאה בעדכון משתמש: ' + err.message);
//         }
//       });
//     }
//   }

//   // ביטול עריכה
//   cancelEdit(): void {
//     this.editMode = null;  // מבטלת את מצב העריכה
//     this.editUserDetails = new UserDTO();  // מאפסת את הנתונים לעריכה
//   }

//   // מחיקת משתמש
//   deleteUser(id: number): void {
//     if (confirm('את בטוחה שברצונך למחוק משתמש זה?')) {
//       this.userClient.userDELETE(id).subscribe(() => {
//         this.loadUsers();
//       });
//     }
//   }

//   // הוספת משתמש
//   addUser(): void {
//     console.log('Add new user');
//   }
users: UserDTO[] = [];
  newUser: UserDTO = new UserDTO(); // ➕ משתמש חדש
  editMode: number | null = null;
  editUserDetails: UserDTO = new UserDTO();

  constructor(private userClient: Client) {}

  ngOnInit(): void {
    this.loadUsers();
  }
  cancelAdd(): void {
    this.isAddingNewUser = false;
    this.newUser = new UserDTO(); // לאפס את הטופס
  }
  
  loadUsers(): void {
    this.userClient.userAll().subscribe(data => {
      this.users = data;
    });
  }

  addUser(): void {
    this.userClient.userPOST(this.newUser).subscribe({
      next: (user) => {
        this.users.push(user);
        this.newUser = new UserDTO(); // איפוס הטופס
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