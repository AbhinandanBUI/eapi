import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoanReportComponent } from './loan/loan-report/loan-report.component';
import { LoanComponent } from './loan/loan.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductComponent } from './product/product.component';
import { ProfileComponent } from './profile/profile.component';
import { ReportComponent } from './report/report.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserComponent } from './user.component';
import { WorkingSalaryComponent } from './working-salary/working-salary.component';

const routes: Routes = [{ path: '', component: UserComponent ,
children:[
  {path:'',component:UserDashboardComponent},
  {path:'product',component:ProductComponent},
  {path:'loan',component:LoanComponent},
  {path:'profile',component:ProfileComponent},
  {path:'dashboard',component:UserDashboardComponent},
  {path:'report',component:ReportComponent},
  {path:'workingsalary',component:WorkingSalaryComponent},
  {path:'orders',component:OrdersComponent},
  {path:'loanbill/:id',component:LoanReportComponent},
]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
