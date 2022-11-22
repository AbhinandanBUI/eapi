import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'Home', pathMatch: 'full' },
  { path: 'Home', loadChildren: () => import('./Website/website.module').then(m => m.WebsiteModule) },
  { path: 'User', loadChildren: () => import('./User/user.module').then(m => m.UserModule) },
  { path: 'Admin', loadChildren: () => import('./Admin/admin.module').then(m => m.AdminModule), },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
