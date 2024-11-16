  import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
  import { BrowserModule } from '@angular/platform-browser';
  import { HttpClientModule } from '@angular/common/http';
  import { FormsModule } from '@angular/forms';
  import { AppRoutingModule } from './app-routing.module'; // Correct routing
  import { RouterModule } from '@angular/router';
  import { MatAutocompleteModule } from '@angular/material/autocomplete';
  import { MatChipsModule } from '@angular/material/chips';
  import { MatFormFieldModule } from '@angular/material/form-field';
  import { MatIconModule } from '@angular/material/icon';
  import { MatInputModule } from '@angular/material/input';

  @NgModule({
    declarations: [],
    imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      AppRoutingModule,
      RouterModule,
      MatAutocompleteModule,
      MatChipsModule,
      MatFormFieldModule,
      MatIconModule,
      MatInputModule,
    ],
    schemas: [NO_ERRORS_SCHEMA],
    bootstrap: [] // Make sure it boots properly
  })
  export class AppModule { }
