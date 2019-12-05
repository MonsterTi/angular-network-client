import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

// services
import { UserService } from 'src/app/shared/service/user.service';
import { MessageUser } from "src/app/shared/models/messageUser";

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.css']
})
export class NewsfeedComponent implements OnInit, OnDestroy {
  public myForm: FormGroup;
  public lesMessage2; 
  //public lesMessages:Observable<MessageUser>
  public subMessage

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      message: ['', ],
    });
  
  // It does not work
  // this.lesMessages = this.userService.reloadNewsFeed()
  // console.log(this.lesMessages)

  // OK that works
  this.subMessage = this.userService.reloadNewsFeed().subscribe((user: MessageUser)=>{
  console.log(user);
  this.lesMessage2 = user;
  }, (err)=>{
    console.log(err);
  })
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subMessage.unsubscribe(); 
  }

  // méthode pour envoyer un message
  submit() {
    console.log(this.myForm.value);
    this.userService.sendMessage(this.myForm.value).subscribe(()=>{
    })
  };
}
