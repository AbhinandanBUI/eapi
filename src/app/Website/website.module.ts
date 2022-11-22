import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebsiteRoutingModule } from './website-routing.module';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { WebsiteComponent } from './website.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { WebhomeComponent } from './webhome/webhome.component';


@NgModule({
  declarations: [
    WebsiteComponent,
    LoginComponent,
    RegistrationComponent,
    ForgetPasswordComponent,
    WebhomeComponent
  ],
  imports: [
    CommonModule,
    WebsiteRoutingModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class WebsiteModule { }
