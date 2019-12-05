import { Component, OnInit } from '@angular/core';
// models
import { User } from 'src/app/shared/models/user.model';
// service
import { UserService } from 'src/app/shared/service/user.service';
// rxjs
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  public currentUser: Observable<User>;

  constructor(private userService: UserService) { }
  
  ngOnInit() {
    this.currentUser = this.userService.getCurrentUser() 
  }
  
}
