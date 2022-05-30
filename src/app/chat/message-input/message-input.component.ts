import { ChatService } from './../../services/chat.service';
import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html',
  styleUrls: ['./message-input.component.scss']
})
export class MessageInputComponent implements OnInit {

  messageText: string = '';
  isUserTyping: boolean = false;
  lastTypingEvent: number = (new Date).getTime();
  typingEventLength: number = 500;

  @Output("sendNewMessage")
  sendNewMessageEventEmitter: EventEmitter<string> = new EventEmitter<string>();

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {

    if (event.key === 'Enter') {
      this.sendMessage();
    }
  }
  constructor(private chatService: ChatService) { }

  ngOnInit() {
  }

  sendMessage() {
    if(this.messageText.length > 0) {
      this.sendNewMessageEventEmitter.emit(this.messageText);
      this.messageText = '';
    } 
  }

  updateTypingInfo() {
    console.log('updatingTypingInfo');
    if(!this.isUserTyping) {
      this.isUserTyping = true;
      this.chatService.setUserTyping(this.chatService.getCurrentLoggedUser());
    }
    this.lastTypingEvent = (new Date).getTime();

    setTimeout(() => {
      const timer = (new Date).getTime();
      const typingTimeDifference = timer - this.lastTypingEvent;
      if(typingTimeDifference >= this.typingEventLength && this.isUserTyping) {
        this.chatService.stopUserTyping(this.chatService.getCurrentLoggedUser());
        this.isUserTyping = false;
      }
    }, this.typingEventLength);

  }
}
