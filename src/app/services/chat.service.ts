import { Message } from './../models/message.model';
import { UserInfo } from './../models/userInfo.model';
import { UserAction } from '../models/userAction.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { io } from 'socket.io-client';
import { ConnectedUsers } from '../models/connectedUsers.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  userCount$: Subject<ConnectedUsers> = new Subject<ConnectedUsers>();
  newMessage$: Subject<Message> = new Subject<Message>();
  newUser$: Subject<string> = new Subject<string>();
  leftUser$: Subject<string> = new Subject<string>();
  newError$: Subject<any> = new Subject<any>();
  socketConnected$: Subject<string> = new Subject<string>();
  newTypingUser$: Subject<UserInfo> = new Subject<UserInfo>();
  newStopTypingUser$: Subject<UserInfo> = new Subject<UserInfo>();
  
  currentUser: string = '';
  constructor() { }

  socket = io('https://sts-chat-server.herokuapp.com/');

  userCountListener() {
    return this.userCount$.asObservable();
  }
  addUserToChat = (username: string) => {
    this.currentUser = username;
    this.socket.emit('add user', username);
  }

  connectAsNewUser = () => {
    this.socket.on('login', (userData: ConnectedUsers) => {
      this.userCount$.next(userData);
    });
  }

  userJoined = () => {
    this.socket.on('user joined', (data: UserAction) => {
      this.userCount$.next({numUsers: data.numUsers});
      this.newUser$.next(data.username);
    })
    return this.newUser$.asObservable();
  }

  userLeft = () => {
    this.socket.on('user left', (data: UserAction) => {
      this.userCount$.next({numUsers: data.numUsers});
      this.leftUser$.next(data.username);
    })
    return this.leftUser$.asObservable();
  }

  getNewMessage = () => {
    this.socket.on('new message', (data: Message) => {
      this.newMessage$.next(data);
    });
    return this.newMessage$.asObservable();
  }

  sendNewMessage = (messageText: string) => {
    this.socket.emit('new message', messageText);
  }

  setUserTyping = (username: string) => {
    this.socket.emit('typing', username);
  } 

  stopUserTyping = (username: string) => {
    this.socket.emit('stop typing', username);
  }

  checkTypingUsers = () => {
    this.socket.on('typing',(username: UserInfo) => {
      this.newTypingUser$.next(username);
    });
    return this.newTypingUser$.asObservable();
  }

  checkStopTypingUsers = () => {
    this.socket.on('stop typing',(username: UserInfo) => {
      this.newStopTypingUser$.next(username);
    });
    return this.newStopTypingUser$.asObservable();
  }

  getErrors = () => {
    this.socket.io.on('error', error => {
      this.newError$.next(error);
    })
    return this.newError$.asObservable();
  }

  getConnectedStatus = () => {
    this.socket.on("connect", () => {
      console.log(this.socket.id); 
      this.socketConnected$.next('Connected');
    });
    return this.socketConnected$.asObservable();
  }


  getCurrentLoggedUser = () => {
    return this.currentUser;
  }
}
