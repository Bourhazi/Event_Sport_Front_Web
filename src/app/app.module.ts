import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module'; // Correct routing
import { NavbarComponent } from './navbar/navbar.component'; // Navbar component
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [NavbarComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule, // Import AppRoutingModule here
    RouterModule, // Needed for [routerLink] to work
  ],
  bootstrap: [] // Make sure it boots properly
})
export class AppModule { }
