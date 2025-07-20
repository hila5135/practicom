import { Routes } from '@angular/router';
import { AuthComponentComponent } from './components/auth-component/auth-component.component';
import { HomeComponent } from './components/home/home.component';
import { LecturerComponent } from './components/lecturer-component/lecturer-component.component';
import { UsersComponentComponent } from './components/users-component/users-component.component';
import { LessonsListComponentComponent } from './components/lessons-list-component/lessons-list-component.component';
import { authGuard } from './guards/auth.guard';
import { MenuComponent } from './components/menu/menu.component';
    
export const routes: Routes = [
{path: '', component:AuthComponentComponent},       
{path:'home', component:HomeComponent, canActivate:[authGuard]},
// {path:'menu' , component:MenuComponent },
{path:'lecturersManagement', component:LecturerComponent },
{path:'usersManagement',component:UsersComponentComponent},
{path:'lessonsManagement' , component:LessonsListComponentComponent},
{path:'auth', component:AuthComponentComponent},
];
