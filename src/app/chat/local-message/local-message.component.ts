import { Component, Input, OnInit } from '@angular/core';
import { Message } from 'src/app/models/message.model';

@Component({
  selector: 'app-local-message',
  templateUrl: './local-message.component.html',
  styleUrls: ['./local-message.component.scss']
})
export class LocalMessageComponent implements OnInit {

  @Input() message: Message = {
    username: '',
    message: ''
  }
  
  constructor() { }

  ngOnInit() {
  }

}
