// import { CommonModule } from '@angular/common';
// import { Component } from '@angular/core';
// import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

// @Component({
//   selector: 'app-menu',
//   standalone: true,
//   imports: [CommonModule,RouterLink,RouterLinkActive,RouterOutlet],
//   templateUrl: './menu.component.html',
//   styleUrl: './menu.component.css'
// })
// export class MenuComponent {

  
// }
import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterLinkActive,RouterOutlet,
      MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  toggleSidenav() {
    this.sidenav.toggle();
  }
}
