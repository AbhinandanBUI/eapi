import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { WebhomeComponent } from './webhome/webhome.component';
import { WebsiteComponent } from './website.component';

const routes: Routes = [
  {path:'',component:WebsiteComponent,
  children:[
    {path:'',component:LoginComponent},
    {path:'login',component:LoginComponent},
    {path:'Registration',component:RegistrationComponent},
    {path:'forget-password',component:ForgetPasswordComponent},
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebsiteRoutingModule { }
