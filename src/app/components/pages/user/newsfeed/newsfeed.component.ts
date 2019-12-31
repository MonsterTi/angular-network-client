import { Component, OnInit, OnDestroy, Input } from '@angular/core';

// services
import { UserService } from 'src/app/shared/service/user.service';
import { MessageUser } from "src/app/shared/models/messageUser";
import { Subscription, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.css']
})
export class NewsfeedComponent implements OnInit, OnDestroy {

  public newsfeed:BehaviorSubject<MessageUser> = new BehaviorSubject<any>(0);
  public sub: Subscription;

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit() {
  this.sub = this.userService.reloadNewsFeed().subscribe((user: MessageUser)=>{
  this.newsfeed.next(user);
  }, (err)=>{
    console.log(err);
  });
};

  ngOnDestroy(): void {
    this.sub.unsubscribe(); 
  }
}
