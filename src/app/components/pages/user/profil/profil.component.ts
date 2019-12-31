import { Component, OnInit, OnDestroy } from '@angular/core';
// models
import { User } from 'src/app/shared/models/user.model';
// service
import { UserService } from 'src/app/shared/service/user.service';
// rxjs
import { Observable, Subscription, BehaviorSubject } from 'rxjs';
import { MessageUser } from 'src/app/shared/models/messageUser';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit, OnDestroy {
  public currentUser: Observable<User>;
  public sub: Subscription;
  public newsfeed:BehaviorSubject<MessageUser> = new BehaviorSubject<any>(0);

  constructor(private userService: UserService) { }
  
  ngOnInit() {
    this.currentUser = this.userService.getCurrentUser();
    this.sub = this.userService.userProfilNewsfeed().subscribe((data: MessageUser)=>{
      this.newsfeed.next(data);
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
    
}
