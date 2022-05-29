import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NicknameComponent } from './nickname.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    NicknameComponent
  ],
  declarations: [NicknameComponent]
})
export class NicknameModule { }
