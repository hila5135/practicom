import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MenuComponent } from "../menu/menu.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet, MenuComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
