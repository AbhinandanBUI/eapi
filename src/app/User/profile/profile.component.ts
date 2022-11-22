import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MasterService } from 'src/app/Service/master.service';
import { ToasterService } from 'src/app/Service/Toaster/toaster.service';
import { TokenService } from 'src/app/Service/token.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userid: any;

  constructor(
    private api:MasterService,
    private toaster:ToasterService,
    private token:TokenService
  ) { }
  profileform = new FormGroup({
    fname:new FormControl(''),
    lname:new FormControl(''),
    email:new FormControl(''),
    // password:new FormControl(''),
    phone:new FormControl(''),
    // fname:new FormControl(''),
  })

  ngOnInit(): void {
    this.userid = this.token.getUser()
    this.GetProfileDetails();
  }
  GetProfileDetails(){
    this.profileform.disable();
    this.profileform.patchValue({
      fname:this.userid.first_name,
      lname:this.userid.last_name,
      email:this.userid.email,
      phone:this.userid.mobile,
    })

  }

}
