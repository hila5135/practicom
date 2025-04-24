import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from "./components/home/home.component";
import { AuthComponentComponent } from "./components/auth-component/auth-component.component";
import { LecturerComponent } from './components/lecturer-component/lecturer-component.component';
import { UsersComponentComponent } from "./components/users-component/users-component.component";
import { MenuComponent } from "./components/menu/menu.component";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent, AuthComponentComponent, LecturerComponent, UsersComponentComponent, MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-project';
}
