import { Message } from './../../models/message.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-server-message',
  templateUrl: './server-message.component.html',
  styleUrls: ['./server-message.component.scss']
})
export class ServerMessageComponent implements OnInit {

  @Input() message: Message = {
    username: '',
    message: '',
  };
  
  constructor() { }

  ngOnInit() {
  }

}
