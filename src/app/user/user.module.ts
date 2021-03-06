import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  UserRoutingModule,
  LoginComponent,
  RegistrationComponent,
  UserService
} from './user.barrel';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UserRoutingModule
  ],
  declarations: [
    LoginComponent,
    RegistrationComponent
  ],
  providers: [
    UserService
  ]
})
export class UserModule { }
