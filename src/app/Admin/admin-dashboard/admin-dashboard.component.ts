import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/Service/token.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  constructor(
    private token:TokenService
  ) { }

  ngOnInit(): void {
  }
  logout(){
this.token.signout();
  }

}
