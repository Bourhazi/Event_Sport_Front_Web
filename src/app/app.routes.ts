import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateTypeSportComponent } from './create-type-sport/create-type-sport.component';
import { MainContentComponent } from './main-content/main-content.component';

export const routes: Routes = [
  { path: 'create-type-sport', component: CreateTypeSportComponent },
  { path: 'home', component: MainContentComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
