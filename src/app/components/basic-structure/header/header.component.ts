import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import {
  AuthService
} from 'src/app/shared/service/auth.service';
import {
  JwtToken
} from 'src/app/shared/models/jwtToken.model';
import {
  Subscription,
  Observable,
  of
} from 'rxjs';
import {
  FormGroup,
  FormBuilder
} from '@angular/forms';
import {
  startWith,
  map,
  switchMap
} from 'rxjs/operators';
import {
  UserService
} from 'src/app/shared/service/user.service';
import {
  Router
} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  // On place le retour du subscribe dans notre nouvelle variable.
  public jwtTokenHeader: JwtToken;
  // Pour unsusbscribe et éviter la fuite mémoire.
  public filterOptions: Observable < string[] > ;
  public suscription: Subscription;
  public suscriptionSearch: Subscription;
  public myForm: FormGroup;
  public bool: Boolean

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router) {}

  onKey($event) {
    if ($event.code === 'Backspace') {
      this.bool = false;
    };
    if ($event.code !== 'Backspace') {
      this.bool = true;
    };
  }

  ngOnInit() {

    this.myForm = this.fb.group({
      search: [''],
    });

    this.filterOptions = this.myForm.get('search').valueChanges.pipe(
      startWith(null),
      switchMap((val) => {
        if (this.bool && String(val).length < 20) {
          const obj = {
            search: ''
          }
          obj.search = val
          return this.userService.searchUser(obj).pipe(map((data) => {
            let monTab = [];
            for (let index = 0; index < data.length; index++) {
              monTab[index] = data[index];
            }
            return monTab;
          }))
        } else {
          return of(null);
        }
      }));

    this.suscription = this.authService.jwtTokenVar.subscribe((jwtToken: JwtToken) => {
      this.jwtTokenHeader = jwtToken;
    });

  };

  searchId(id: string) {
    this.router.navigate(['/user-profil', id]);
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  };

  public logout(): void {
    this.myForm.get('search').reset(null)
    this.authService.logout()
  };

}
