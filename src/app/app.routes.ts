import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { CreateTypeSportComponent } from './Components/create-Edit-type-sport/create-Edit-type-sport.component';
import { MainContentComponent } from './Components/main-content/main-content.component';
import { ListTypeSportComponent } from './Components/list-type-sport/list-type-sport.component';
import { LocalisationMapComponent } from './Components/localisation-map/localisation-map.component';
import { SportDetailsComponent } from './Components/sport-details/sport-details.component';
import { CreateEditTypeComponent } from './Components/create-edit-type/create-edit-type.component';
import { CreateEditListPromotionComponent } from './Components/create-edit-list-promotion/create-edit-list-promotion.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: MainContentComponent },
  { path: 'create-type-sport', component: CreateTypeSportComponent },
  { path: 'create-type-sport/:id', component: CreateTypeSportComponent },
  { path: 'sports-list', component: ListTypeSportComponent },
  { path: 'sports-details/:id', component: SportDetailsComponent },
  { path: 'localisations', component: LocalisationMapComponent },
  { path: 'regles', component: CreateEditTypeComponent },
  { path: 'promotions', component: CreateEditListPromotionComponent },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
