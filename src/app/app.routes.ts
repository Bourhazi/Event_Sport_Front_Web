import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { CreateTypeSportComponent } from './Components/create-Edit-type-sport/create-Edit-type-sport.component';
import { MainContentComponent } from './Components/main-content/main-content.component';
import { ListTypeSportComponent } from './Components/list-type-sport/list-type-sport.component';
import { LocalisationMapComponent } from './Components/localisation-map/localisation-map.component';
import { SportDetailsComponent } from './Components/sport-details/sport-details.component';
import { CreateEditTypeComponent } from './Components/create-edit-regle/create-edit-type.component';
import { CreateEditListPromotionComponent } from './Components/create-edit-list-promotion/create-edit-list-promotion.component';
import { CreateEditParticipantComponent } from './Components/create-edit-participant/create-edit-participant.component';
import { ParticipantListComponent } from './Components/participant-list/participant-list.component';
import { CreateEditEvenementComponent } from './Components/create-edit-evenement/create-edit-evenement.component';
import { EvenementListComponentComponent } from './Components/evenement-list-component/evenement-list-component.component';
import { ParticipantManagementComponent } from './Components/participant-management/participant-management.component';
import { EvenementDetailsComponent } from './Components/evenement-details/evenement-details.component';
import { ResultatFormComponent } from './Components/resultat-form/resultat-form.component';
import { ParticipantListEventComponent } from './Components/Participants/participant-list-event/participant-list-event.component';
import { CreateEvenetParParticipantComponent } from './Components/Participants/create-evenet-par-participant/create-evenet-par-participant.component';
import { ListEventPromotionParParticipantComponent } from './Components/Participants/list-event-promotion-par-participant/list-event-promotion-par-participant.component';
import { ClassementGlobalParSportComponent } from './Components/Participants/classement-global-par-sport/classement-global-par-sport.component';
import { ParticipantProfileComponent } from './Components/Participants/participant-profile/participant-profile.component';
import { AdminVerificationComponentComponent } from './Components/admin-verification-component/admin-verification-component.component';
import { LoginComponentComponent } from './Components/login-component/login-component.component';
import { AuthGuard } from './services/Authentification/auth.guard';
import { RoleGuard } from './services/Authentification/role.guard';
import { ParticipantGuard } from './services/Authentification/ParticipantGuard';
import { SignUpComponentComponent } from './Components/sign-up-component/sign-up-component.component';
import { ForgotPasswordComponent } from './Components/forgot-password/forgot-password.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponentComponent },
  { path: 'sign-up', component: SignUpComponentComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },

  // Routes accessibles uniquement aux administrateurs
  { path: 'home', component: MainContentComponent, canActivate: [AuthGuard, RoleGuard] },
  { path: 'create-type-sport', component: CreateTypeSportComponent, canActivate: [AuthGuard, RoleGuard] },
  { path: 'create-type-sport/:id', component: CreateTypeSportComponent, canActivate: [AuthGuard, RoleGuard] },
  { path: 'sports-list', component: ListTypeSportComponent, canActivate: [AuthGuard, RoleGuard] },
  { path: 'sports-details/:id', component: SportDetailsComponent, canActivate: [AuthGuard, RoleGuard] },
  { path: 'localisations', component: LocalisationMapComponent, canActivate: [AuthGuard, RoleGuard] },
  { path: 'regles', component: CreateEditTypeComponent, canActivate: [AuthGuard, RoleGuard] },
  { path: 'promotions', component: CreateEditListPromotionComponent, canActivate: [AuthGuard, RoleGuard] },
  { path: 'create-participant', component: CreateEditParticipantComponent, canActivate: [AuthGuard, RoleGuard] },
  { path: 'edit-participant/:id', component: CreateEditParticipantComponent, canActivate: [AuthGuard, RoleGuard] },
  { path: 'participants-list', component: ParticipantListComponent, canActivate: [AuthGuard, RoleGuard] },
  { path: 'create-evenements', component: CreateEditEvenementComponent, canActivate: [AuthGuard, RoleGuard] },
  { path: 'edit-evenements/:id', component: CreateEditEvenementComponent, canActivate: [AuthGuard, RoleGuard] },
  { path: 'evenements-list', component: EvenementListComponentComponent, canActivate: [AuthGuard, RoleGuard] },
  { path: 'evenements/:id/participants', component: ParticipantManagementComponent, canActivate: [AuthGuard, RoleGuard] },
  { path: 'evenements/:id/details', component: EvenementDetailsComponent, canActivate: [AuthGuard, RoleGuard] },
  { path: 'resultats/ajouter', component: ResultatFormComponent, canActivate: [AuthGuard, RoleGuard] },
  { path: 'verification-evenements', component: AdminVerificationComponentComponent, canActivate: [AuthGuard, RoleGuard] },

  // Routes accessibles uniquement aux participants
  { path: 'participant-evenements', component: ParticipantListEventComponent, canActivate: [AuthGuard, ParticipantGuard] },
  { path: 'create-participant-evenement', component: CreateEvenetParParticipantComponent, canActivate: [AuthGuard, ParticipantGuard] },
  { path: 'participant-evenements-promotions', component: ListEventPromotionParParticipantComponent, canActivate: [AuthGuard, ParticipantGuard] },
    { path: 'classement-global', component: ClassementGlobalParSportComponent, canActivate: [AuthGuard, ParticipantGuard] },
  { path: 'participants/:id', component: ParticipantProfileComponent, canActivate: [AuthGuard, ParticipantGuard] },

  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
