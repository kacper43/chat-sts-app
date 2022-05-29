import { ChatService } from './../services/chat.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nickname',
  templateUrl: './nickname.component.html',
  styleUrls: ['./nickname.component.scss']
})
export class NicknameComponent implements OnInit {

  username: string = '';

  regex: RegExp = new RegExp('^[a-zA-Z0-9]{1,16}$');
  constructor(private chatService: ChatService, private router: Router) { }

  ngOnInit() {
  }

  isUsernameValid() {
    return this.regex.test(this.username);
  }

  addNewChatUser() {
    this.chatService.addUserToChat(this.username);
    this.router.navigate(['/chat']);
  }
}
