import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MasterService } from 'src/app/Service/master.service';
import { PayFrom } from 'src/app/Service/static';
import { ToasterService } from 'src/app/Service/Toaster/toaster.service';
import { TokenService } from 'src/app/Service/token.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  PayFromList?: { Id: number; pname: string }[];
  OrderForm = new FormGroup({
    productName: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
    ]),
    amount: new FormControl('', [Validators.required, Validators.minLength(1)]),
    payFrom: new FormControl('0', [
      Validators.required,
      Validators.minLength(1),
    ]),
  });
  userid: any;
  UProductList: any;

  //
  constructor(
    private api: MasterService,
    private toaster: ToasterService,
    private token: TokenService,
    private fb: FormBuilder
  ) {}
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
  };
  public barChartLabels = [
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
  public barChartLegend = true;
  public barChartData = [
    { data: [10, 20, 30, 40, 50, 60, 70], label: 'Series A' },
    { data: [15, 25, 35, 45, 55, 65, 75], label: 'Series A' },
    { data: [20, 30, 40, 50, 60, 70, 80], label: 'Series A' },
    { data: [25, 35, 45, 55, 65, 75, 85], label: 'Series A' },
    { data: [30, 40, 50, 60, 70, 80, 90], label: 'Series A' },
    { data: [35, 45, 55, 65, 75, 85, 95], label: 'Series B' },
  ];
  ngOnInit() {
    this.toaster.loader();
    this.userid = parseInt(this.token.getUser().userId);
    this.PayFromList = PayFrom;
    this.GetProduct();
  }
  GetProduct() {
    const data = {
      userId: this.userid,
    };
    this.api.post(data, 'product', 'allOrder').subscribe({
      next: (response) => {
        if (response.success == true) {
          this.UProductList = response.responseData;
        } else {
          console.log('no product found');
        }
      },
    });
  }

  Save() {
    const data = {
      userId: this.userid,
      productName_Id: this.OrderForm.controls['productName'].value,
      amount: this.OrderForm.controls['amount'].value,
      payFrom: this.OrderForm.controls['payFrom'].value,
    };
    if (this.OrderForm.controls['productName'].value == "0" ) {
      this.toaster.WarningMessage('Plz Select Product Name',1000);
    } else {
      if (this.OrderForm.controls['payFrom'].value == "0" ) {
        this.toaster.WarningMessage('Plz Select A Payment Type',1000);
      } else {
        this.api.post(data, 'product', 'saveOrder').subscribe({
          next: (response) => {
            if (response.success == true) {
              this.toaster.SuccessMessage('Product Addedd Successfully', 2000);
              this.OrderForm.reset();
              this.OrderForm.patchValue({
                productName: '',
                amount: '',
                payFrom: '0',
              });
              document.getElementById('closebtn')?.click();
    
              this.GetProduct();
            } else {
              alert(response);
            }
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    }
  }
}
