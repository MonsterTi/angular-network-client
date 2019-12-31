import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// les components
import { BlocPrincipalComponent } from './components/basic-structure/bloc-principal/bloc-principal.component';
import { SignupComponent } from './components/pages/auth/signup/signup.component';
import { SigninComponent } from './components/pages/auth/signin/signin.component';
import { ProfilComponent } from './components/pages/user/profil/profil.component';
import { NewsfeedComponent } from './components/pages/user/newsfeed/newsfeed.component';
import { UserProfilComponent } from './components/pages/user/user-newsfeed-search/user-profil.component';

// Guards
import { AuthGuard } from './shared/guards/auth.guard';
import { SignGuard } from './shared/guards/sign.guard';


const APP_ROUTE: Routes = [
  { path: '', canActivate: [SignGuard],component: BlocPrincipalComponent },
  { path: 'signin', canActivate: [SignGuard],component: SigninComponent },
  { path: 'signup', canActivate: [SignGuard],component: SignupComponent },
  { path: 'profil', canActivate: [AuthGuard] ,component: ProfilComponent },
  { path: 'user-profil/:id', canActivate: [AuthGuard] ,component: UserProfilComponent },
  { path: 'newsfeed', canActivate: [AuthGuard] ,component: NewsfeedComponent },
  { path: '**', canActivate: [AuthGuard], component: NewsfeedComponent },
  { path: '**', canActivate: [SignGuard], component: BlocPrincipalComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTE)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
