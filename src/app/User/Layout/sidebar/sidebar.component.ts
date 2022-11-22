import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/Service/token.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  userName: any;

  constructor(
    private token:TokenService
  ) { }

  ngOnInit(): void {
    
  }
  logout(){
    this.token.signout()
  }
}
