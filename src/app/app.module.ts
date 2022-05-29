import { ChatService } from './services/chat.service';
import { NicknameModule } from './nickname/nickname.module';
import { ChatModule } from './chat/chat.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChatModule,
    NicknameModule
  ],
  providers: [ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
