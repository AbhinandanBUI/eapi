import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MasterService } from 'src/app/Service/master.service';
import { ToasterService } from 'src/app/Service/Toaster/toaster.service';
import { TokenService } from 'src/app/Service/token.service';

@Component({
  selector: 'app-working-salary',
  templateUrl: './working-salary.component.html',
  styleUrls: ['./working-salary.component.scss'],
})
export class WorkingSalaryComponent implements OnInit {
  userid: any;
  userdetails: any;
  basicSalaryDetails: any;

  constructor(
    private token: TokenService,
    private toast: ToasterService,
    private date: DatePipe,
    private api: MasterService
  ) {}
  salaryFrom = new FormGroup({
    name: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    totalsalary: new FormControl('', [Validators.required]),
    crsalary: new FormControl('', [Validators.required]),
    companyName: new FormControl('ex Pvt. Ltd', [Validators.required]),
  });

  salaryUpdateForm = new FormGroup({
    companyName: new FormControl('', [Validators.required]),
    salarycrDate: new FormControl('', [Validators.required]),
    totalsalary: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.userdetails = this.token.getUser();
    this.userid = this.userdetails.userId;
    this.GetSalaryDetail();
  }
  //#Get Basic Details
  GetSalaryDetail() {
    
    const data = {
      userId: this.userid,
    };
    this.api.post(data, 'Salary', 'GetSalaryDetails').subscribe({
      next: (response) => {
        if (response.success == true) {
          this.basicSalaryDetails = response.responseData;
          this.salaryFrom.patchValue({
            name: this.basicSalaryDetails[0].name,
            date: this.basicSalaryDetails[0].SalaryDetails[0].DateOfSalary,
            totalsalary:
              this.basicSalaryDetails[0].SalaryDetails[0].totalSalary,
            companyName:
              this.basicSalaryDetails[0].SalaryDetails[0].CompanyName,
          });
        } else {
          this.basicSalaryDetails = [];
        }
      },
    });
  }
  //#Create entry of salary

  Save() {
    const data = {
      userId: this.userid,
      name: this.salaryFrom.controls['name'].value,
      creditedSalary: this.salaryFrom.controls['crsalary'].value,
      SalaryDetails: [
        {
          CompanyName: this.salaryUpdateForm.controls['companyName'].value,
          totalSalary: this.salaryUpdateForm.controls['totalsalary'].value,
          DateOfSalary: this.salaryUpdateForm.controls['salarycrDate'].value,
        },
      ],
    };

    this.api.post(data, 'Salary', 'Create').subscribe({
      next: (response) => {
        if (response.success == true) {
          this.toast.SuccessMessage(response.responseData, 1000);
        } else {
          this.toast.WarningMessage(response.message, 1000);
        }
      },
    });
  }

  UpdateSalaryAndCreditDate() {
    this.salaryFrom.patchValue({
      name: this.userdetails.first_name + ' ' + this.userdetails.last_name,
      date: this.salaryUpdateForm.controls['salarycrDate'].value,
      totalsalary: this.salaryUpdateForm.controls['totalsalary'].value,
      companyName: this.salaryUpdateForm.controls['companyName'].value,
    });
    document.getElementById('closebtn')?.click();
  }

  loader(){
    this.toast.loader();
  }
}
