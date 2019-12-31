import { Component, OnInit, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MessageUser } from 'src/app/shared/models/messageUser';

@Component({
  selector: 'app-newsfeed-minimum',
  templateUrl: './newsfeed-minimum.component.html',
  styleUrls: ['./newsfeed-minimum.component.css']
})
export class NewsfeedMinimumComponent implements OnInit {

  @Input() newsfeedUserProfil:BehaviorSubject<MessageUser> = new BehaviorSubject<any>(0);
  @Input() newsfeedBasic:BehaviorSubject<MessageUser> = new BehaviorSubject<any>(0);
  @Input() profilNewsfeed:BehaviorSubject<MessageUser> = new BehaviorSubject<any>(0);

  
  constructor() { }

  ngOnInit() {
  }

}
