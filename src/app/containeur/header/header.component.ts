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
  Observable
} from 'rxjs';
import {
  FormGroup,
  Validators,
  FormBuilder
} from '@angular/forms';
import {
  startWith,
  map
} from 'rxjs/operators';
import { 
  UserService 
} from 'src/app/shared/service/user.service';

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
  public bool:Boolean

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private userService: UserService) {}

  onKey($event) {
    if ($event.code === 'Backspace') {
      this.bool = false;
    };
    if ($event.code !== 'Backspace') {
      this.bool = true;
    };
  }

  public options:string[] = [''];

  ngOnInit() {

    this.myForm = this.fb.group({
      search: [''],
    });

    this.filterOptions = this.myForm.get('search').valueChanges.pipe(
      startWith(null),
      map((val) => {
        if (!val) {
          this.suscription.unsubscribe();
          return null;
        } 
        if (this.bool) {
        const filterValue = val.trim().toLowerCase();
        const obj = {search: ''}
        obj.search = filterValue;
        this.suscriptionSearch = this.userService.searchUser(obj).subscribe((data)=>{
         let monTab:string[] = []
          for (let index = 0; index < data.length; index++) {
            monTab[index] = data[index].nom
          }

          console.log(monTab.filter((option) => { 
            return option.toLowerCase().startsWith(filterValue)
          }));
          
          return monTab.filter((option) => { 
            return option.toLowerCase().startsWith(filterValue)
          })
          }); 
        }
      }));
      
    this.suscription = this.authService.jwtTokenVar.subscribe((jwtToken: JwtToken) => {
      this.jwtTokenHeader = jwtToken;
    });
  };

 

  ngOnDestroy(): void {
    this.suscriptionSearch.unsubscribe();
    if (this.suscription) {
      this.suscription.unsubscribe();
    };
  };

  public logout(): void {
    this.authService.logout()
  };

}
