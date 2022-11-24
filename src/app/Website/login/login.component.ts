import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MasterService } from 'src/app/Service/master.service';
import { ToasterService } from 'src/app/Service/Toaster/toaster.service';
import { TokenService } from 'src/app/Service/token.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private api: MasterService,
    private token:TokenService,
    private router:Router,
    private toaster:ToasterService
    ) {}
  loginform = new FormGroup({
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required,Validators.minLength(4)]),
  });

  ngOnInit(): void {}

  login() {
    const data = {
      email: this.loginform.controls['email'].value,
      password: this.loginform.controls['password'].value,
    };
    
    this.api.post(data, 'user', 'login').subscribe({
      next: (response) => {
       
        if (response.success == true) {
          this.toaster.LoginSuccess();
          this.token.SaveUserAndToken(response.token,response.responseData,true);
          // this.router.navigateByUrl('User');
          this.token.makeLogin();
          
          // alert('login success');
        } else {
          this.toaster.FormNotValid('Email Or Password not valid',1000)
          // Swal.fire({
          //   position: 'top-start',
          //   icon: 'error',
          //   title: 'Email Or Password not valid',
          //   // text: 'Something went wrong!',
          // })
        }
      },error:err=>{
        this.toaster.ErrorMessage('Unable to login plz try again after sometimes',2000);
      }
    });
  }
  //sweetalert

  
}
