import { Component, OnInit } from '@angular/core';
import { ToasterService } from 'src/app/Service/Toaster/toaster.service';
import { TokenService } from 'src/app/Service/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  userName?: string;
  constructor(private token: TokenService,
    ) {}

  ngOnInit(): void {
    const userdata =   this.token.getUser();
    console.log(userdata);
    this.userName = userdata.first_name+' '+userdata.last_name; 
  }
  logout() {
    this.token.signout();
  }
}
