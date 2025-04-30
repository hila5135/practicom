import { Component, OnInit } from '@angular/core';
import { Client, LoginModel } from '../../api/api-client';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { jwtDecode } from "jwt-decode";
import { Router } from '@angular/router';


interface JwtPayload {
  [key: string]: any;
  name: string;
  role: string;
  exp: number;
}

@Component({
  selector: 'app-auth-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth-component.component.html',
  styleUrls: ['./auth-component.component.css']
})
export class AuthComponentComponent implements OnInit {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  loading: boolean = false;

  constructor(private client: Client , private router: Router) { }

  ngOnInit(): void { }

  login(): void {
    const loginModel = new LoginModel();
    loginModel.userName = this.username;
    loginModel.userPassword = this.password;
    this.loading = true;

    this.client.login(loginModel).subscribe({
      next: (response: any) => {
        // אם אין טוקן בתשובה
        const token = response.token;
        if (!token) {
          this.errorMessage = 'שם משתמש או סיסמה שגויים';
          console.log('No token received');
          return;
        }

        // אם יש טוקן, ננסה לפענח אותו
        try {
          const decoded = jwtDecode(token) as JwtPayload;
          console.log('Decoded:', decoded);

          // נבדוק אם ה-role הוא 'Admin'
          if (decoded && decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === 'Admin') {
            console.log('Login successful as Admin');
            alert('ברוך הבא !');
            this.router.navigate(['/home']);
            localStorage.setItem('token', token);
          } else {
            this.errorMessage = 'רק למנהלים מותר להיכנס למערכת';
          }
        } catch (err) {
          console.error('Token decode failed', err);
          this.errorMessage = 'שגיאה בפענוח טוקן';
        }
     
      },
      error: (err) => {
        this.loading = false;
      
        if (err.status === 401) {
          this.errorMessage = 'אתה לא רשום במערכת!';
        } else {
          this.errorMessage = 'שגיאה במהלך ההתחברות';
        }
      
        console.error(err);
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
}
