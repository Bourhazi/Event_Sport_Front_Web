<<<<<<< Updated upstream
import { Routes } from '@angular/router';

export const routes: Routes = [];
=======
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateTypeSportComponent } from './create-Edit-type-sport/create-Edit-type-sport.component';
import { MainContentComponent } from './main-content/main-content.component';
import { ListTypeSportComponent } from './list-type-sport/list-type-sport.component';

export const routes: Routes = [
  { path: 'create-type-sport', component: CreateTypeSportComponent },
  { path: 'create-type-sport/:id', component: CreateTypeSportComponent },
  { path: 'home', component: MainContentComponent },
  { path: 'sports-list', component: ListTypeSportComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
>>>>>>> Stashed changes
