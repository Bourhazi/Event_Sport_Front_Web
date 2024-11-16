import { Component } from '@angular/core';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { MainContentComponent } from './Components/main-content/main-content.component';
import { FooterComponent } from './Components/footer/footer.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent, MainContentComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Event_Sport_Front_Web';
}
