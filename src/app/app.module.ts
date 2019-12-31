// modules natifs
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// les autres modules 
import { ComponentsModule } from './components/module/components.module';
import { UiModule } from './shared/ui/ui.module';
// Routing module
import { AppRoutingModule } from './app-routing.module';
// Component 
import { AppComponent } from './app.component';
// Services
import { AuthService } from './shared/service/auth.service';
import { UserService } from './shared/service/user.service';
// modules httpClient
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// Guards 
import { AuthGuard } from './shared/guards/auth.guard';
// interceptors
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    //modules natifs
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    //autres modules 
    ComponentsModule,
    UiModule,
    // mon module http
    HttpClientModule,
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
    },
    // mon service user http
    AuthService,
    UserService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
