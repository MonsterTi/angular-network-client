// les modules natifs
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// les components
import { HeaderComponent } from '../header/header.component';
import { BlocPrincipalComponent } from '../bloc-principal/bloc-principal.component';
import { FooterComponent } from '../footer/footer.component';
import { SignupComponent } from '../auth/signup/signup.component';
import { SigninComponent } from '../auth/signin/signin.component';
import { ProfilComponent } from '../profil/profil.component';
import { NewsfeedComponent } from '../newsfeed/newsfeed.component';

// les autres modules 
import { UiModule } from 'src/app/shared/ui/ui.module';

// Routing module
import { AppRoutingModule } from 'src/app/app-routing.module';



@NgModule({
  declarations: [
    HeaderComponent,
    BlocPrincipalComponent,
    FooterComponent,
    SignupComponent,
    SigninComponent,
    ProfilComponent,
    NewsfeedComponent
  ],
  imports: [
    CommonModule,
    UiModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ]
})
export class ContaineurModModule { }
