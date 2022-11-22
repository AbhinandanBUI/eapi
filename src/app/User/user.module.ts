import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { SidebarComponent } from './Layout/sidebar/sidebar.component';
import { HeaderComponent } from './Layout/header/header.component';
import { ProductComponent } from './product/product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductNamePipe } from './Pipe/product-name.pipe';
import { PayfromNamePipe } from './Pipe/payfrom-name.pipe';
import { jqxGridModule } from 'jqwidgets-ng/jqxgrid';
import { ProfileComponent } from './profile/profile.component';
import { LoanComponent } from './loan/loan.component';
import { ReportComponent } from './report/report.component';
import { WorkingSalaryComponent } from './working-salary/working-salary.component';
import { OrdersComponent } from './orders/orders.component';
import { NgChartsModule } from 'ng2-charts';
import { LoanReportComponent } from './loan/loan-report/loan-report.component';


@NgModule({
  declarations: [
    UserComponent,
    UserDashboardComponent,
    SidebarComponent,
    HeaderComponent,
    ProductComponent,
    ProductNamePipe,
    PayfromNamePipe,
    ProfileComponent,
    LoanComponent,
    ReportComponent,
    WorkingSalaryComponent,
    OrdersComponent,
    LoanReportComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    jqxGridModule,
    NgChartsModule,
    
    
     
    
  ],
  providers: [
    DatePipe,
    ProductNamePipe
  ],
})
export class UserModule { }
