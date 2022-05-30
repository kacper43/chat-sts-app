import { Router } from '@angular/router';
import { Message } from './../models/message.model';
import { ConnectedUsers } from './../models/connectedUsers.model';
import { ChatService } from './../services/chat.service';
import { AfterViewChecked, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MessageType } from '../models/enums/messageTypeEnum.model';
import { UserInfo } from '../models/userInfo.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewChecked {

  userCount: number = 0;
  messages: Message[] = [];
  typingMessages: Message[] = [];
  messageInputText: string = '';
  lastSender: string = 'template';

  @ViewChild('messages_container') private messagesContainer: ElementRef;
  
  constructor(private chatService: ChatService, private router: Router, private cdr: ChangeDetectorRef) { }

  ngOnInit() {    
 
    if(this.chatService.getCurrentLoggedUser() != '') {
      this.chatService.connectAsNewUser();
      this.sendInitialMessage();
      this.startUserCounterListener();
      this.startNewUsersListener();
      this.startLeavingUsersListener();
      this.startMessagesListener();
      this.startErrorLogger();
      this.startUserTypingListener();
    } else {
      this.router.navigate(['/']);
    }
  }

  ngAfterViewChecked() {        
    this.scrollToBottom();    
    this.cdr.detectChanges();
  } 

  sendInitialMessage = () => {
    this.messages.push(this.generateMessage('ChatBot', 'Hello ' + this.chatService.getCurrentLoggedUser() + ', Welcome to the chatroom', MessageType.EXTERNAL_USER));
  }

  startUserCounterListener = () => {
    this.chatService.userCountListener().subscribe((response: ConnectedUsers) => {
      this.userCount = response.numUsers;
    });
  }

  startNewUsersListener = () => {
    this.chatService.userJoined().subscribe((user: string) => {
      this.messages.push(this.generateMessage(user, user + ' joined the chat', MessageType.SERVER));
      this.lastSender = 'server';
    });
  }

  startLeavingUsersListener = () => {
    this.chatService.userLeft().subscribe((user: string) => {
      this.messages.push(this.generateMessage(user, user + ' left', MessageType.SERVER));
      this.lastSender = 'server';
    })
  }

  startMessagesListener = () => {
    this.chatService.getNewMessage().subscribe((response: Message) => {
      if(response.username === this.lastSender) {
        this.messages.push(this.generateMessage('', response.message, MessageType.EXTERNAL_USER));
      } else {
        this.messages.push(this.generateMessage(response.username, response.message, MessageType.EXTERNAL_USER));
        this.lastSender = response.username;
      }
    })
  }

  startUserTypingListener = () => {
    this.chatService.checkTypingUsers().subscribe((user: UserInfo) => {
      let result = this.typingMessages.filter(message => {
        return message.username === user.username;
      })
      if(result.length === 0) {
        this.typingMessages.push(this.generateMessage(user.username, '...', MessageType.EXTERNAL_USER));
      }
    });

    this.chatService.checkStopTypingUsers().subscribe((user: UserInfo) => {
      this.typingMessages.forEach((message, index) => {
        if(message.username === user.username) {
          this.typingMessages.splice(index, 1);
          return;
        }
      });
    });
  }

  startErrorLogger = () => {
    this.chatService.getErrors().subscribe(error => {
      console.log(error);
    })
  }

  generateMessage = (username: string, message: string, type?: MessageType) => {
    let messageBuffer: Message = {
      username: username,
      message: message,
      type: type
    };
    return messageBuffer;  
  }

  scrollToBottom = () => {
    try {
      this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
    } catch {}
  }

  sendChatMessage = (messageText: string) => {
    this.chatService.sendNewMessage(messageText);
    this.messageInputText = '';
    if(this.chatService.getCurrentLoggedUser() === this.lastSender) {
      this.messages.push(this.generateMessage('', messageText, MessageType.LOGGED_USER));
    } else {
      this.messages.push(this.generateMessage(this.chatService.getCurrentLoggedUser(), messageText, MessageType.LOGGED_USER));
      this.lastSender = this.chatService.getCurrentLoggedUser();
    }
  }

}
