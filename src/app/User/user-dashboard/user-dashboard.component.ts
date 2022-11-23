import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MasterService } from 'src/app/Service/master.service';
import { MonthName } from 'src/app/Service/static';
import { ToasterService } from 'src/app/Service/Toaster/toaster.service';
import { TokenService } from 'src/app/Service/token.service';
import Swal from 'sweetalert2';
import { ChartOptions, ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
})
export class UserDashboardComponent implements OnInit {
  UserList: any;
  userid: any;
  dashboardDataList: any;
  apiname = 'Dashboard';
  DailyAmount: any;
  MonthlyAmount: any;
  YearlyAmount: any;
  DashboardIsActive: any;
  monthname: { Id: number; pname: string }[];
  LoanSend: any;
  LoanReceived: any;
  basicSalaryDetails: any;
  salaryPercentageUsage: any;
  minthid: any;
  MonthlyRecordsAmount: any;
  // barChartOptions?: { scaleShowVerticalLines: boolean; responsive: boolean, pointHitRadius: number, pointHoverRadius: Number };
  barChartLabelss?: string[];
  barChartLegend?: boolean;
  barChartData?: { data: any; label: string }[];
  WeeklyRecords: any;
  barChartLabelsss?: any[];
  barChartDataWeek?: { data: any[]; label: string }[];
  barChartDatayearly?: any[];
  barChartLabelyearly?: any[];
  leftamount?: number;
  currentWeekNumber: any;
  weekbtn?: boolean;
  disablebtnweeknumber: any;
  weekbtnnext?: boolean;
  currentyearNumber: any;
  yearnumber: any;
  yearnum = new FormControl();
  barChartOptions?: {
    scaleShowVerticalLines: boolean; responsive: boolean; pointHitRadius: number; // expands the hover 'detection' area
    pointHoverRadius: number; tooltip: {
      // ⤵️ tooltip main styles
      backgroundColor: string; displayColors: boolean; // removes unnecessary legend
      padding: number;
      // ⤵️ title
      titleColor: string; titleFont: { size: number; };
      // ⤵️ body
      bodyColor: string; bodyFont: { size: number; };
    };
  };
  PayAmount: any;
  IsSendcard?: boolean;
  constructor(
    private api: MasterService,
    private token: TokenService,
    private toast: ToasterService,
    private datepipe: DatePipe
  ) {
    this.monthname = MonthName;
  }
  curMonth = new FormControl('');

  ngOnInit(): void {
    this.toast.loader();
    const userDetails = this.token.getUser();
    this.userid = userDetails.userId;
    this.CheckDashboard();

    this.getchart();
    var today = new Date();
    
    this.currentWeekNumber = this.datepipe.transform(today, 'ww');
    this.currentyearNumber = this.datepipe.transform(today, 'yyyy');
    this.disablebtnweeknumber = this.currentWeekNumber;
    this.yearnum.setValue(this.currentyearNumber);

    this.GetWeeklyStats('cur');
    this.GetMonthlyStats(this.currentyearNumber, 'cur');
  }

  // GetDashboardData(){
  //   const data={
  //     userId :this.userid
  //   }
  //
  //   this.api.post(data,this.apiname,'GetDashBoard').subscribe({
  //     next:response=>{
  //       if (response.success == true) {
  //         this.dashboardDataList = response.responseData;
  //         this.DailyAmount = this.dashboardDataList.totalProductDaily;
  //         this.MonthlyAmount = this.dashboardDataList.totalProductMonth;
  //         this.YearlyAmount = this.dashboardDataList.totalProductYearly;
  //         // this.DailyAmount = this.dashboardDataList[0];
  //         console.log(this.dashboardDataList)
  //       } else {
  //         this.dashboardDataList = [];
  //       }
  //     }
  //   })
  // }
  GetDashboardData() {
    let date = new Date();
    this.curMonth.patchValue((date.getMonth() + 1).toString());

    const data = {
      date: date.getDate(),
      monthId: date.getMonth() + 1,
      year: date.getFullYear(),
      userId: parseInt(this.userid),
    };
    this.api.post(data, this.apiname, 'Amount').subscribe({
      next: (response) => {
        if (response.success == true) {
          this.dashboardDataList = response.responseData;
          this.DailyAmount = this.dashboardDataList['DailyAmount'];
          this.MonthlyAmount = this.dashboardDataList['MonthlyAmount'];
          this.YearlyAmount = this.dashboardDataList['YearlyAmount'];
          this.LoanSend = this.dashboardDataList['LoanSend'];
          this.LoanReceived = this.dashboardDataList['ReceiveLoan'];
         
          this.PayAmount = this.dashboardDataList['LoanSend'] - this.dashboardDataList['ReceiveLoan'];
          if (this.PayAmount >0) {
            // you will receive 
            this.IsSendcard = true;
          } else {
            // you will pay 
            this.PayAmount = -1 * this.PayAmount
            this.IsSendcard = false;
          }
          this.PercentageCalculator();
        } else {
          this.DailyAmount = 0;
          this.MonthlyAmount = 0;
          this.YearlyAmount = 0;
        }
      },
      error: (err) => {
        console.log('api error' + err);
        Swal.fire('The Internet?', 'That thing is still around?', 'question');
      },
    });
  }
  // # check Dashboard is activated or not
  CheckDashboard() {
    const data = {
      userId: this.userid,
    };

    this.api.post(data, this.apiname, 'CheckActivateDashBoard').subscribe({
      next: (response) => {
        if (response.success == true) {
          this.DashboardIsActive = true;
          this.GetDashboardData();
        } else {
          this.DashboardIsActive = false;
          this.DashAlert();
        }
      },
    });
  }
  // # check Dashboard is activated or not
  DashAlert() {
    Swal.fire({
      toast: true,
      title: 'Dashboard Is Not Activated',
      showDenyButton: true,
      timerProgressBar: true,
      showCancelButton: false,
      confirmButtonText: 'Activate',
      denyButtonText: `Deactivate`,
      timer: 15000,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.ActivateDashboard();
      } else if (result.isDenied) {
        this.toast.WarningMessage('Unable to Activate Dashboard ..', 1000);
      }
    });
  }
  ActivateDashboard() {
    const data = {
      userId: this.userid,
      totalProductDaily: 1,
      totalProductMonth: 1,
      totalProductYearly: 1,
      totalAmount: 1,
      amount: 1,
      status: 1,
    };
    this.api.post(data, this.apiname, 'ActivateDashBoard').subscribe({
      next: (response) => {
        this.toast.SuccessMessage('Activated SuccessFully', 2000);
        this.CheckDashboard();
        this.GetDashboardData();
        this.PercentageCalculator();
      },
      error: (err) => {
        this.toast.ErrorMessage('Unable to Activate', 1000);
        console.log('api Error' + err);
      },
    });
  }

  getDashboardSnyc() {
    //working
    this.minthid = this.curMonth.value;
    let date = new Date();
    this.curMonth.patchValue(this.minthid);
    // if (parseInt(this.minthid) <= 9) {
    //   this.minthid = 0 + '' + parseInt(this.minthid);
    // }
    const data = {
      date: 1,
      monthId: parseInt(this.minthid),
      year: date.getFullYear(),
      userId: parseInt(this.userid),
    };

    this.api.post(data, this.apiname, 'Amount').subscribe({
      next: (response) => {
        if (response.success == true) {
          this.dashboardDataList = response.responseData;
          this.DailyAmount = this.dashboardDataList['DailyAmount'];
          this.MonthlyAmount = this.dashboardDataList['MonthlyAmount'];
          this.YearlyAmount = this.dashboardDataList['YearlyAmount'];
          this.LoanSend = this.dashboardDataList['LoanSend'];
          this.LoanReceived = this.dashboardDataList['ReceiveLoan'];
          this.PercentageCalculator();
        } else {
          this.DailyAmount = 0;
          this.MonthlyAmount = 0;
          this.YearlyAmount = 0;
        }
      },
      error: (err) => {
        console.log('api error' + err);
        Swal.fire('The Internet?', 'That thing is still around?', 'question');
      },
    });
  }
  PercentageCalculator() {
    const data = {
      userId: this.userid,
    };
    this.api.post(data, 'Salary', 'GetSalaryDetails').subscribe({
      next: (response) => {
        if (response.success == true) {
          this.basicSalaryDetails = response.responseData;
          this.salaryPercentageUsage = (
            (this.MonthlyAmount / this.basicSalaryDetails[0].creditedSalary) *
            100
          ).toPrecision(2);
          this.getchart();
        } else {
          this.basicSalaryDetails = [];
        }
      },
    });
  }

  //#Chart //
  getchart() {
    this.barChartOptions = {
      scaleShowVerticalLines: false,
      responsive: true,
      pointHitRadius: 15, // expands the hover 'detection' area
      pointHoverRadius: 8,
      tooltip: {
        // ⤵️ tooltip main styles
        backgroundColor: 'white',
        displayColors: true, // removes unnecessary legend
        padding: 10,

        // ⤵️ title
        titleColor: '#2D2F33',
        titleFont: {
          size: 18
        },

        // ⤵️ body
        bodyColor: '#2D2F33',
        bodyFont: {
          size: 13
        }
      }
    };

    //yearly
    this.barChartLabelyearly = [
      'Total Amount  Send',
      'Total Amount Received',
      'Total Amount Left',
    ];
    if (this.LoanSend > this.LoanReceived) {
      this.leftamount = this.LoanSend - this.LoanReceived;
    } else {
      this.leftamount = this.LoanReceived - this.LoanSend;
    }

    this.barChartLegend = true;
    this.barChartDatayearly = [
      {
        data: [this.LoanSend, this.LoanReceived, this.leftamount],
        label: 'Series B',
      },
    ];
  }

  ///monthly Spend Daily Data chart
  GetMonthlyStats(getyr: any, Type: string) {
    if (Type == 'cur') {
      this.yearnumber = parseInt(this.currentyearNumber);
    } else {
      this.yearnumber = parseInt(getyr.value);
    }
    

    console.log('this si year', this.yearnumber);
    const data = {
      year: this.yearnumber,
      userId: parseInt(this.userid),
    };
    this.api.post(data, this.apiname, 'stats/monthly').subscribe({
      next: (response) => {
        if (response.success == true) {
          this.MonthlyRecordsAmount = response.responseData;
          this.barChartLabelss = [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
          ];
          this.barChartOptions = {
            scaleShowVerticalLines: false,
            responsive: true,
            pointHitRadius: 15, // expands the hover 'detection' area
            pointHoverRadius: 8,
            tooltip: {
              // ⤵️ tooltip main styles
              backgroundColor: 'white',
              displayColors: false, // removes unnecessary legend
              padding: 10,
      
              // ⤵️ title
              titleColor: '#2D2F33',
              titleFont: {
                size: 18
              },
      
              // ⤵️ body
              bodyColor: '#2D2F33',
              bodyFont: {
                size: 13
              }
            }
          };
          this.barChartLegend = true;
          this.barChartData = [
            {
              data: [
                this.MonthlyRecordsAmount.M1,
                this.MonthlyRecordsAmount.M2,
                this.MonthlyRecordsAmount.M3,
                this.MonthlyRecordsAmount.M4,
                this.MonthlyRecordsAmount.M5,
                this.MonthlyRecordsAmount.M6,
                this.MonthlyRecordsAmount.M7,
                this.MonthlyRecordsAmount.M8,
                this.MonthlyRecordsAmount.M9,
                this.MonthlyRecordsAmount.M10,
                this.MonthlyRecordsAmount.M11,
                this.MonthlyRecordsAmount.M12,
              ],
              label: 'Amount',
            },
            {
              data: [
                10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000,
                10000, 10000, 10000,
              ],
              label: 'Avg Limit',
            },
          ];
        } else {
          this.MonthlyRecordsAmount[0];
        }
      },
      error: (err) => {
        console.log('api error' + err);
        Swal.fire('The Internet?', 'That thing is still around?', 'question');
      },
    });
  }

  ///weekly chart
  GetWeeklyStats(Type: string) {
    let date = new Date();

    console.log('current week change up', this.currentWeekNumber);
    if (Type == '-1') {
      this.currentWeekNumber = parseInt(this.currentWeekNumber) - 1;
    } else if (Type == '+1') {
      this.currentWeekNumber = parseInt(this.currentWeekNumber) + 1;
    } else {
      this.currentWeekNumber = parseInt(this.currentWeekNumber);
    }
    
    if (this.currentWeekNumber == 1) {
      this.weekbtn = true;
    } else {
      this.weekbtn = false;
    }
    if (parseInt(this.disablebtnweeknumber) <= this.currentWeekNumber) {
      this.weekbtnnext = true;
    } else {
      this.weekbtnnext = false;
    }
    console.log('current week change', this.currentWeekNumber);

    let yr = parseInt(this.currentyearNumber);
    console.log('thu', yr);
    const data = {
      year: yr,
      weekId: this.currentWeekNumber,
      userId: parseInt(this.userid),
    };
    this.api.post(data, this.apiname, 'stats/weekly').subscribe({
      next: (response) => {
        if (response.success == true) {
          this.WeeklyRecords = response.responseData;
          this.barChartLabelsss = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thrusday',
            'Friday',
            'Saturday',
          ];
          this.barChartOptions = {
            scaleShowVerticalLines: false,
            responsive: true,
            pointHitRadius: 20, // expands the hover 'detection' area
            pointHoverRadius: 30,
            tooltip: {
              // ⤵️ tooltip main styles
              backgroundColor: 'white',
              displayColors: false, // removes unnecessary legend
              padding: 10,
      
              // ⤵️ title
              titleColor: '#2D2F33',
              titleFont: {
                size: 18
              },
      
              // ⤵️ body
              bodyColor: '#2D2F33',
              bodyFont: {
                size: 13
              }
            }
           
          };
          this.barChartLegend = true;
          this.barChartDataWeek = [
            {
              data: [
                this.WeeklyRecords.wd1,
                this.WeeklyRecords.wd2,
                this.WeeklyRecords.wd3,
                this.WeeklyRecords.wd4,
                this.WeeklyRecords.wd5,
                this.WeeklyRecords.wd6,
                this.WeeklyRecords.wd7,
              ],
              label: 'Amount = ',
            },
            {
              data: [
                // this.WeeklyRecords.wd1,
                // this.WeeklyRecords.wd2,
                // this.WeeklyRecords.wd3,
                // this.WeeklyRecords.wd4,
                // this.WeeklyRecords.wd5,
                // this.WeeklyRecords.wd6,
                // this.WeeklyRecords.wd7
                200, 200, 200, 200, 200, 200, 200,
              ],
              label: 'Daily Limit ',
            },
          ];
        } else {
          this.MonthlyRecordsAmount[0];
        }
      },
      error: (err) => {
        console.log('api error' + err);
        Swal.fire('The Internet?', 'That thing is still around?', 'question');
      },
    });
  }
}
