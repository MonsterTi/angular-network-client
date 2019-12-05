import {
  Injectable
} from '@angular/core';
import {
  User
} from '../models/user.model';
import {
  Observable,
  BehaviorSubject,
  timer,
  of,
  Subscription
} from 'rxjs';
import {
  HttpClient
} from '@angular/common/http';
import {
  JwtToken
} from '../models/jwtToken.model';
import {
  tap, switchMap
} from 'rxjs/operators/'
import { Router } from '@angular/router';

import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public subscription: Subscription;

  public jwtTokenVar: BehaviorSubject<JwtToken> = new BehaviorSubject({
    isAuthenticated: null,
    token: null
  });

  constructor(
    private userService: UserService,
    private httpClient: HttpClient,
    private router: Router
  ) {
    this.initToken();
    this.subscription = this.initTimer();
  };
 
  public initTimer(){
    return timer(1000, 300000).pipe(
      switchMap(()=>{
        if (localStorage.getItem('jwt')) {
          return this.httpClient.get<string>('/api/auth/refresh-token').pipe(
            tap((token: string)=>{
              console.log('refresh token', token);
              this.jwtTokenVar.next({
                isAuthenticated: true,
                token: token
              });
              localStorage.setItem('jwt', token);
            })
          );
        } else {
          console.log('no token');
          this.subscription.unsubscribe();
          this.router.navigate(['/']);
          return of(null);
        }
      })
    ).subscribe((next)=>{},(error)=>{
      this.jwtTokenVar.next({
        isAuthenticated: false,
        token: null
      });
      localStorage.removeItem('jwt');
      this.subscription.unsubscribe();
    })
  };

  private initToken(): void {
    const token = localStorage.getItem('jwt');

    if (token) {
      this.jwtTokenVar.next({
        isAuthenticated: true,
        token: token
      });
    } else {
      this.jwtTokenVar.next({
        isAuthenticated: false,
        token: null
      });
    };
    console.log(['Mon Token REFRESH'], this.jwtTokenVar.value);
    
  };

  signup(user: User): Observable<User> {
   
    //TODO Sur mon signup.component j'éxécute cette fonction auquel je passe un argument (values inputs), qui une fois éxécuter va faire d'abord un call puis retourner la réponse auquel j'ai souscris sur mon component.

    //? requette http avec la méthode post qui va me retourner un Observable<User> auquel je vais souscrire sur mon component 'signup.component'.
    return this.httpClient.post<User>('/api/auth/signup', user)
  }

  signin(credentials: {
    email: string,
    password: string
  }): Observable<string> {
    //console.log(['credentials'], credentials)
    return this.httpClient.post<string>('api/auth/signin', credentials).pipe(tap((token: string) => {  
      if (localStorage.getItem('jwt')) {
        this.router.navigate(['/']);
      } else {
      //console.log(token);
      this.jwtTokenVar.next({
        isAuthenticated: true,
        token: token
      });
      localStorage.setItem('jwt', token);
      this.subscription = this.initTimer();
    };
    }))
  };

  public logout():void {
  this.userService.disconnect();
  this.jwtTokenVar.next({
    isAuthenticated: false,
    token: null
  });
  this.router.navigate(['/']);
  localStorage.removeItem('jwt');
  console.log(['Deconnexion'], this.jwtTokenVar.value);
  };
}
