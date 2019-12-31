import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// services
import { AuthService } from 'src/app/shared/service/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
}) 
export class SigninComponent implements OnInit {
public myForm: FormGroup;
public error: String;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router 
    ) { }

  ngOnInit() {
    // Ici j'initialise mon formulaire
    this.myForm = this.fb.group({
      email: ['', [Validators.email]],
      password: ['', [Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])/), Validators.minLength(6)]],
    });

  };

  checkInput(name: any){
    if (
     !this.myForm.get(name).invalid 
     &&
     this.myForm.get(name).touched 
     && 
     this.myForm.get(name).dirty) {
      return true
    }
 }

  submit() {
    console.log(['submit'], this.myForm.value)
    this.authService.signin(this.myForm.value).subscribe(()=>{
      this.router.navigate(['newsfeed'])
    }, err => {
      this.error = err.error
      console.log(err.error);
    });
  };

}
