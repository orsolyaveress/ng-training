import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  UserService,
  LoginComponent,
  RegistrationComponent
} from './';
import { UserRoutingModule } from './user-routing.module';
import { AdminComponent } from './components/admin/admin.component';
import { AdminGuard } from './guards/admin.guard';
import { AdminService } from './services/admin.service';
import { UpdateComponent } from './components/update/update.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    UserRoutingModule
  ],
  declarations: [
    LoginComponent,
    RegistrationComponent,
    AdminComponent,
    UpdateComponent
  ],
  providers: [
    UserService,
    AdminService,
    AdminGuard
  ]
})
export class UserModule { }
