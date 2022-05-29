import { Component, Input, OnInit } from '@angular/core';
import { Message } from 'src/app/models/message.model';

@Component({
  selector: 'app-external-message',
  templateUrl: './external-message.component.html',
  styleUrls: ['./external-message.component.scss']
})
export class ExternalMessageComponent implements OnInit {

  @Input() message: Message = {
    username: '',
    message: ''
  }
  
  constructor() { }

  ngOnInit() {
  }

}
