import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MasterService } from 'src/app/Service/master.service';
import { ToasterService } from 'src/app/Service/Toaster/toaster.service';
import { TokenService } from 'src/app/Service/token.service';

@Component({
  selector: 'app-loan-report',
  templateUrl: './loan-report.component.html',
  styleUrls: ['./loan-report.component.scss'],
})
export class LoanReportComponent implements OnInit {
  Id: any;
  userid: any;
  TransitionDetails: any;
  LoanerName: any;
  ViewTransitionDetails: any;
  billDetails: any;
  billMessage: any;
  userDetails: any;
  printContents: string | undefined;
  
 

  constructor(
    private actroute: ActivatedRoute,
    private api: MasterService,
    private token: TokenService,
    // private print:print
    private toaster: ToasterService
  ) { }

  ngOnInit(): void {
    this.userDetails = this.token.getUser();
    this.userid = this.userDetails.userId;
    this.Getdate();
    this.billDetails = this.token.getBill();
    if (this.billDetails.totalPayAmount > 0) {
      this.billMessage =
        this.billDetails.loanerName +
        ' ' +
        'you have to pay ' +
        '' +
        this.userDetails.first_name +
        '' +
        this.userDetails.last_name +
        ' ' +
        'Amount of ' +
        'Rs ' +
        ' ' +
        this.billDetails.totalPayAmount;
    } else if (this.billDetails.totalPayAmount == 0) {
      this.billMessage = 'no due bill is clear Rs.' + ' ' + 0;
    } else {
      debugger;
      let amount = -0 * this.billDetails.totalPayAmount;
      this.billDetails.totalPayAmount =
        amount - this.billDetails.totalPayAmount;

      this.billMessage =
        this.userDetails.first_name +
        ' ' +
        this.userDetails.last_name +
        ' ' +
        'you have to pay ' +
        '' +
        this.billDetails.loanerName +
        ' ' +
        'Amount of ' +
        ' Rs ' +
        ' ' +
        this.billDetails.totalPayAmount;
    }
    debugger;
    console.log('bill details', this.billDetails);
  }

  Getdate() {
    this.actroute.params.subscribe((x) => {
      this.Id = x;
      console.log('this si id', this.Id.id);
      this.ViewTransition();
    });
  }

  // get account
  ViewTransition() {
    this.LoanerName = this.Id;
    const dataa = {
      userId: parseInt(this.userid),
      loanerId: parseInt(this.Id.id),
    };
    debugger;
    this.api.post(dataa, 'loan', 'ViewLoanTransition').subscribe({
      next: (response) => {
        if (response.success == true) {
          this.ViewTransitionDetails = response.responseData;
          console.log('billing data', this.ViewTransitionDetails);
        } else {
          this.toaster.SuccessMessage('no user found', 2000);
        }
      },
      error: (err) => {
        this.toaster.ErrorMessage('api error ahead', 1000);
      },
    });
  }
  printBill(printingId:any) {
    const printContent = document.getElementById("printingId");
    const WindowPrt = window.open('', '', 'left=150,top=150,width=900,height=900,toolbar=0,scrollbars=0,status=0');
    // WindowPrt.document.write(printContent.innerHTML);
    // WindowPrt.document.close();
    // WindowPrt.focus();
    // WindowPrt.print();
    // WindowPrt.close();
    window.print();
    
  }
}
