import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from './storage.service';
import Swal from 'sweetalert2';
import { ToasterService } from './Toaster/toaster.service';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  token?: string;
  user: any[] = [];
  Amount: any[] = [];
  AmountDetails = 'AmountDetail';
  UserDetails = 'UserDetails';
  billDetails = 'billDetails'
  isAuthenticated?: Boolean;
  isLogin = 'isLogin';
  JwtToken = 'jwtToken';

  // user:User;
  // user$ = (new BehaviorSubject<User>(this.ls.getItem('TestByMe')));
  constructor(
    private ls: StorageService,
    private router: Router,
    private toaster:ToasterService

  ) // private toaster: ToasterService

  {}

  public makeLogin() {
    if (this.isLoggedIn()) {
      debugger
      const userid = (this.getUser()).roleId;
      if (userid == '01') {
        this.router.navigateByUrl('Admin');
      } else {
        this.router.navigateByUrl('User');
      }
    } else {
      // this.toaster.showToast(webToasterPosition.toasterTopLeftPosition, 'default', 'Your browser out of memory');
      alert('device out of service');
    }
  }
  isLoggedIn(): Boolean {
    return !!this.GetJwtToken();
  }

  GetJwtToken() {
    return this.ls.getItem(this.JwtToken);
  }
  getUser() {
    const data = this.ls.getItem(this.UserDetails);
    return data;
  }
  getAmount() {
    debugger;
    const data = this.ls.getItem(this.AmountDetails);
    return data;
  }
  getBill() {
    debugger;
    const data = this.ls.getItem(this.billDetails);
    return data;
  }

  SaveUserAndToken(token: string, user: any, isAuthenticated: any) {
    this.isAuthenticated = isAuthenticated;
    this.token = token;
    this.user = user;
    //  this.user$.next(user);
    this.ls.setItem(this.JwtToken, token);
    this.ls.setItem(this.UserDetails, user);
    this.ls.setItem(this.isLogin, isAuthenticated);
  }

  saveAmount(Amount: any) {
    debugger;
    this.Amount = Amount;
    this.ls.setItem(this.AmountDetails, Amount);
  }
  public signout() {
    this.ls.clear();
    this.toaster.LogoutSuccess();

    this.router.navigateByUrl('Home/login');
  }

  public savePrintBill(billrow:any){
    this.ls.setItem(this.billDetails, billrow);
  }
}
