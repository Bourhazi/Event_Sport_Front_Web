import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateTypeSportComponent } from './create-Edit-type-sport/create-Edit-type-sport.component';
import { MainContentComponent } from './main-content/main-content.component';
import { ListTypeSportComponent } from './list-type-sport/list-type-sport.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: MainContentComponent },
  { path: 'create-type-sport', component: CreateTypeSportComponent },
  { path: 'sports-list', component: ListTypeSportComponent },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
