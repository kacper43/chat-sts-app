import { MessageInputComponent } from './message-input/message-input.component';
import { LocalMessageComponent } from './local-message/local-message.component';
import { FormsModule } from '@angular/forms';
import { ExternalMessageComponent } from './external-message/external-message.component';
import { ServerMessageComponent } from './server-message/server-message.component';
import { ConnectedUsersComponent } from './connected-users/connected-users.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat.component';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';

const config: SocketIoConfig = { url: 'http://localhost:8988', options: {} };

@NgModule({
  imports: [
    CommonModule,
    SocketIoModule.forRoot(config),
    FormsModule
  ],
  exports: [
    ChatComponent, ConnectedUsersComponent, ServerMessageComponent, ExternalMessageComponent, LocalMessageComponent, MessageInputComponent
  ],
  declarations: [ChatComponent, ConnectedUsersComponent, ServerMessageComponent, ExternalMessageComponent, LocalMessageComponent, MessageInputComponent]
})
export class ChatModule { }
