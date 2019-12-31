// les modules natifs
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// les components
import { HeaderComponent } from '../basic-structure/header/header.component';
import { BlocPrincipalComponent } from '../basic-structure/bloc-principal/bloc-principal.component';
import { FooterComponent } from '../basic-structure/footer/footer.component';
import { SignupComponent } from '../pages/auth/signup/signup.component';
import { SigninComponent } from '../pages/auth/signin/signin.component';
import { ProfilComponent } from '../pages/user/profil/profil.component';
import { NewsfeedComponent } from '../pages/user/newsfeed/newsfeed.component';
import { UserProfilComponent } from '../pages/user/user-newsfeed-search/user-profil.component';
import { SendmessageComponent } from '../minimum-components/sendmessage/sendmessage.component';
import { NewsfeedMinimumComponent } from '../minimum-components/newsfeed-minimum/newsfeed-minimum.component';

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
    NewsfeedComponent,
    UserProfilComponent,
    SendmessageComponent,
    NewsfeedMinimumComponent
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
export class ComponentsModule { }
