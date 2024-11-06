import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { CreateTypeSportComponent } from './create-Edit-type-sport/create-Edit-type-sport.component';
import { MainContentComponent } from './main-content/main-content.component';
import { ListTypeSportComponent } from './list-type-sport/list-type-sport.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: MainContentComponent },
  { path: 'create-type-sport', component: CreateTypeSportComponent },
  { path: 'create-type-sport/:id', component: CreateTypeSportComponent }, // Pour l'édition d'un type de sport
  { path: 'sports-list', component: ListTypeSportComponent },
  { path: '**', redirectTo: 'home' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }