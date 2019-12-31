import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-sendmessage',
  templateUrl: './sendmessage.component.html',
  styleUrls: ['./sendmessage.component.css']
})
export class SendmessageComponent implements OnInit {
  public myForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      message: ['', ],
    });
  }

  submit() {
    console.log(this.myForm.value);
    this.userService.sendMessage(this.myForm.value).subscribe(()=>{
    })
  };

}
