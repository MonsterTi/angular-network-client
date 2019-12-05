import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// les components
import { BlocPrincipalComponent } from './containeur/bloc-principal/bloc-principal.component';
import { SignupComponent } from './containeur/auth/signup/signup.component';
import { SigninComponent } from './containeur/auth/signin/signin.component';
import { ProfilComponent } from './containeur/profil/profil.component';
import { NewsfeedComponent } from './containeur/newsfeed/newsfeed.component';

// Guards
import { AuthGuard } from './shared/guards/auth.guard';
import { SignGuard } from './shared/guards/sign.guard';


const APP_ROUTE: Routes = [
  { path: '', canActivate: [SignGuard],component: BlocPrincipalComponent },
  { path: 'signin', canActivate: [SignGuard],component: SigninComponent },
  { path: 'signup', canActivate: [SignGuard],component: SignupComponent },
  { path: 'profil', canActivate: [AuthGuard] ,component: ProfilComponent },
  { path: 'newsfeed', canActivate: [AuthGuard] ,component: NewsfeedComponent },
  { path: '**', canActivate: [AuthGuard], component: NewsfeedComponent },
  { path: '**', canActivate: [SignGuard], component: BlocPrincipalComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTE)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
