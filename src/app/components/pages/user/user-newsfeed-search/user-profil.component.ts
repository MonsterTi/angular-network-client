import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { UserService } from 'src/app/shared/service/user.service';
import { MessageUser } from 'src/app/shared/models/messageUser';
import { Subscription, Subject, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-user-profil',
  templateUrl: './user-profil.component.html',
  styleUrls: ['./user-profil.component.css']
})
export class UserProfilComponent implements OnInit, OnDestroy {
  public newsfeed:BehaviorSubject<MessageUser> = new BehaviorSubject<any>(0);
  public subs:Subscription;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
    ) { }
  
  ngOnInit() {
    
    this.route.paramMap.subscribe((params: ParamMap)=>{
      let user = {id: null};
      user.id = params.get('id');
      this.subs = this.userService.userSearchProfil(user).subscribe((data: MessageUser)=>{
        this.newsfeed.next(data)
      })
      console.log('Mon ID ', user.id);
    });
    
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
