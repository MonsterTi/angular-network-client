// modules natifs
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
// Rxjs
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// Services
import { AuthService } from '../service/auth.service';
// Models
import { JwtToken } from '../models/jwtToken.model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router){
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
      
    return this.authService.jwtTokenVar.pipe(map((jwtToken: JwtToken)=>{
      if (!jwtToken.isAuthenticated) {
        this.router.navigate(['/'])
      }
      return jwtToken.isAuthenticated
    }));
  };
  
}
