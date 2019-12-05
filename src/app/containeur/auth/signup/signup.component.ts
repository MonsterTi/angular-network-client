// modules natifs
import {
  Component,
  OnInit
} from '@angular/core';
// modules pour les formulaire
import {
  FormBuilder,
  FormGroup, 
  Validators
} from '@angular/forms';
// services
import { AuthService } 
from 'src/app/shared/service/auth.service';
// models
import {
  User
} from '../../../shared/models/user.model';
// router
import {
  Router
} from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {

  public myForm: FormGroup; 
  public errorExist: String = ''; // ma variable à afficher une error de mon submit()

  constructor(
    private fb: FormBuilder, // mon form builder qui me sert à faire mon formulaire.
    private authService: AuthService, // mon service que j'ai injecté pour faire appel à une méthode de ce service.
    private router: Router // mon routeur que j'ai appellé pour rediriger une fois que j'ai la réponse de mon service.
  ) {
    
  }

  ngOnInit() {
    // ici j'initialise mon formulaire
    this.myForm = this.fb.group({
      email: ['', [Validators.email, Validators.maxLength(50)]],
      nom: ['', [Validators.minLength(2), Validators.maxLength(40)]],
      prenom: ['', [Validators.minLength(2), Validators.maxLength(40)]],
      password: ['', [Validators.minLength(6), Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])/), Validators.maxLength(100)]],
    });
  };
  // fonction pour vérifier mes inputs.
  checkInput(arg: any){
     if (
      !this.myForm.get(arg).invalid 
      &&
      this.myForm.get(arg).touched 
      && 
      this.myForm.get(arg).dirty) {
       return true
     }
  };

  submit(): void {
    console.log(`
      [PASSWORD] ${this.myForm.get('password').invalid},
      [NOM] ${this.myForm.get('nom').invalid},
      [PRENOM] ${this.myForm.get('prenom').invalid},
      [EMAIL] ${this.myForm.get('email').invalid},
    `);
    
    console.log(['Signup Component - Submit Subscribe'],this.myForm.value);
    // Ma methode qui se trouve dans mon service
    // On souscribe à la méthode car elle va nous retrouner un observable
    this.authService.signup(this.myForm.value).subscribe((user: User) => {
    console.log(user);
      this.router.navigate(['/signin'])
    }, 
    err => { 
      this.errorExist = err.error;
    })
  };

}
