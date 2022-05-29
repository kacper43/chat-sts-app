import { ConnectedUsers } from './../../models/connectedUsers.model';
import { ChatService } from './../../services/chat.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-connected-users',
  templateUrl: './connected-users.component.html',
  styleUrls: ['./connected-users.component.scss']
})
export class ConnectedUsersComponent implements OnInit {

  @Input() connectedUsers: number = 0;

  constructor() { }

  ngOnInit() {
  }

}
