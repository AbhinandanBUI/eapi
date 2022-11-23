import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MasterService } from 'src/app/Service/master.service';
import { PayFromString, ProductNameString } from 'src/app/Service/static';
import { ToasterService } from 'src/app/Service/Toaster/toaster.service';
import { TokenService } from 'src/app/Service/token.service';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.scss'],
})
export class LoanComponent implements OnInit {
  userid: any;
  AccountDetails: any;
  isActive: boolean = false;
  AccountList: any;
  ProductList?: { Id: string; pname: string }[];
  PayFromList?: { Id: string; pname: string }[];

  LoanTransitionForm = new FormGroup({
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    amount: new FormControl('', [Validators.required]),
    transitionType: new FormControl('10', [Validators.required]),
    payFrom: new FormControl('0', [Validators.required]),
  });
  LoanerName: any;
  LoanerId: any;
  ViewTransitionDetails: any;
  payAmount: any;
  constructor(
    private toaster: ToasterService,
    private router: Router,
    private api: MasterService,
    private token: TokenService // private toaster:ToasterService,
  ) {}

  ngOnInit(): void {
    this.toaster.loader();
    this.userid = parseInt(this.token.getUser().userId);
    this.ProductList = ProductNameString;
    this.PayFromList = PayFromString;
    this.GetAccountList();
  }
  GetAccountList() {
    const data = {
      userId: this.userid,
    };
    this.api.post(data, 'loan', 'GetLoanAccount').subscribe({
      next: (response) => {
        debugger
        if (response.success == true) {
          // this.toaster.SuccessMessage('account found', 1000);
          this.AccountList = response.responseData;
          console.log(this.AccountList);
          for (let index = 0; index < this.AccountList.length; index++) {
            const Relement = this.AccountList[index].totalReceiveAmount;
            const Selement = this.AccountList[index].totalSendAmount;
            this.payAmount = Selement - Relement;
          }
        } else {
          this.toaster.SuccessMessage('user found', 1000);
        }
      },
      error: (err) => {
        this.toaster.ErrorMessage('api error ahead', 1000);
      },
    });
  }

  GetAccount(num: any) {
    if (num.value != '') {
      let field = num.value;
      const data = {
        mobile: field,
      };
      if (num.value.length >= 10 && num.value.length <= 10) {
        this.api.post(data, 'user', 'GetAccount').subscribe({
          next: (response) => {
            if (response.success == true) {
              this.toaster.SuccessMessage('user found', 1000);
              this.AccountDetails = response.responseData;
              this.isActive = true;
            } else {
              this.toaster.SuccessMessage('no user found', 2000);
            }
          },
          error: (err) => {
            this.toaster.ErrorMessage('api error ahead', 1000);
          },
        });
      } else {
        this.toaster.FormNotValid('plz enter a valid number of 10 digit', 2000);
      }
    } else {
      this.toaster.FormNotValid('plz fill the box', 2000);
    }
  }
  // CreateAccount
  CreateAccount() {
    this.toaster.loader();
    const data = {
      userId: this.userid,
      loanerId: this.AccountDetails[0].userId,
      lonaerName:
        this.AccountDetails[0].first_name +
        ' ' +
        this.AccountDetails[0].last_name,
      status: 1,
      amount: 0,
      createdBy: this.userid,
    };
    this.api.post(data, 'loan', 'CreateAccount').subscribe({
      next: (response) => {
        if (response.success == true) {
          this.toaster.SuccessMessage('Account Created', 2000);
          this.isActive = false;
          document.getElementById('closebtn')?.click();
          this.GetAccountList();
        } else {
          document.getElementById('closebtn')?.click();
          this.toaster.SuccessMessage(response.message, 2000);
          this.isActive = false;
        }
      },
      error: (err) => {
        this.toaster.ErrorMessage('api error ahead', 1000);
      },
    });
  }

  AddAmount(data: any) {
    this.LoanerName = data.loanerName;
    this.LoanerId = data.loanerId;
  }

  SaveTransition() {
    this.toaster.loader();
    const data = {
      userId: this.userid,
      loanerId: this.LoanerId,
      transitionType: this.LoanTransitionForm.controls['transitionType'].value,
      description: this.LoanTransitionForm.controls['description'].value,
      status: 1,
      amount: this.LoanTransitionForm.controls['amount'].value,
      createdBy: this.userid,
      payFrom: this.LoanTransitionForm.controls['payFrom'].value,
    };
    //
    if (this.LoanTransitionForm.controls['transitionType'].value == '10') {
      this.toaster.WarningMessage('Plz Select Transtition Type', 1000);
    } else {
      if (this.LoanTransitionForm.controls['payFrom'].value == '0') {
        this.toaster.WarningMessage('Plz Select Payment Type', 1000);
      } else {
        this.api.post(data, 'loan', 'addloan').subscribe({
          next: (response) => {
            if (response.success == true) {
              this.toaster.SuccessMessage('Amount Added', 2000);
              document.getElementById('cls-btn')?.click();
              this.LoanTransitionForm.reset();
              this.GetAccountList();
            } else {
              this.toaster.SuccessMessage(response.message, 2000);
            }
          },
          error: (err) => {
            this.toaster.ErrorMessage('api error ahead', 1000);
          },
        });
      }
    }
  }

  ViewTransition(data: any) {
    this.toaster.loader();
    this.LoanerName = data.loanerName;
    const dataa = {
      userId: this.userid,
      loanerId: data.loanerId,
    };
    this.api.post(data, 'loan', 'ViewLoanTransition').subscribe({
      next: (response) => {
        if (response.success == true) {
          this.ViewTransitionDetails = response.responseData;
        } else {
          this.toaster.SuccessMessage('no user found', 2000);
        }
      },
      error: (err) => {
        this.toaster.ErrorMessage('api error ahead', 1000);
      },
    });
  }

  printbill(data: any) {
    this.toaster.loader();
    debugger;
    let id = data.loanerId;
    let loanerId = data.loanerId;
    this.token.savePrintBill(data);
    this.router.navigateByUrl(`/loanbill/${id}`);
  }
}
