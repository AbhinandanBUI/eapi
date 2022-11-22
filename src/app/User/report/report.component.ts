import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MasterService } from 'src/app/Service/master.service';
import { MonthName, YearS } from 'src/app/Service/static';
import { ToasterService } from 'src/app/Service/Toaster/toaster.service';
import { TokenService } from 'src/app/Service/token.service';
import Swal from 'sweetalert2';
import { ProductNamePipe } from '../Pipe/product-name.pipe';
// import { Iproduct } from './iproduct';

interface Iproduct{
  productName_Id : string ,
  amount : number ,
  dop : string ,
  payFrom: string 
};

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit {
  monthname?: { Id: number; pname: string }[];
  years?: { y: number }[];
  ProductList: any;

  pro? : Iproduct[];

  productfilterform = new FormGroup({
    year: new FormControl(),
    month: new FormControl(),
    fromdate: new FormControl(),
    todate: new FormControl(),
  });
  userId: any;
  
  TotalAmount: number =0;
 
  constructor(
    private datepipe: DatePipe,
    private proNamepipe:ProductNamePipe,
    private api: MasterService,
    private toaster: ToasterService,
    private token: TokenService
  ) {}

  ngOnInit(): void {
    this.userId = this.token.getUser().userId;
    ///get month
    this.monthname = MonthName;
    this.years = YearS;
    this.patchvaluesinform();
    this.GetProduct();
  }
  //patch default date
  patchvaluesinform() {
    const today = new Date();
    const fdate = this.datepipe.transform(today, 'yyyy-MM-01');
    // const fdate = this.datepipe.transform(today,'yyyy')+'-'+ 0+today.getMonth()+'-'+this.datepipe.transform(today,'01');
    this.productfilterform.controls['year'].disable();
    this.productfilterform.controls['month'].disable();
    this.productfilterform.controls['fromdate'].disable();
    this.productfilterform.controls['todate'].disable();
    this.productfilterform.patchValue({
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      fromdate: fdate,
      todate: this.datepipe.transform(today, 'yyyy-MM-dd'),
    });
  }
  //filter call

  callfilter() {
    Swal.fire({
      toast: true,
      title: 'filter your record',
      showDenyButton: true,
      timerProgressBar: true,
      showCancelButton: true,
      confirmButtonText: 'By Date',
      denyButtonText: `By Month`,
      timer: 15000,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.productfilterform.controls['year'].disable();
        this.productfilterform.controls['month'].disable();
        this.productfilterform.controls['fromdate'].enable();
        this.productfilterform.controls['todate'].enable();
      } else if (result.isDenied) {
        this.productfilterform.controls['fromdate'].disable();
        this.productfilterform.controls['todate'].disable();
        this.productfilterform.controls['month'].enable();
      }
    });
  }
  //get product list
  GetProduct() {
    const data = {
      userId: this.userId,
    };
    this.api.post(data, 'product', 'allProduct').subscribe({
      next: (response) => {
        if (response.success == true) {
          this.ProductList = response.responseData;
          this.pro = this.ProductList;
          this.TotalAmount = 0;
          for (let index = 0; index < this.ProductList.length; index++) {
            const  element = this.proNamepipe.transform(this.ProductList[index].productName_Id);
            const element2 = this.proNamepipe.transform(this.ProductList[index].payFrom);
            this.ProductList[index].dop = this.datepipe.transform(this.ProductList[index].dop,'dd-MM-yyyy');
            const element3 = this.ProductList[index].amount;
            this.TotalAmount  +=element3;
          }
          
        
        } else {
          console.log('no product found');
        }
      },
    });
  }
 MoreFilter(){
  const data = {
    year :this.productfilterform.controls['year'].value,
    month :parseInt(this.productfilterform.controls['month'].value),
    fromDate :this.productfilterform.controls['fromdate'].value,
    toDate :this.productfilterform.controls['todate'].value,
    userId :parseInt(this.userId)
  }
  console.log(data);
  this.api.post(data, 'product', 'filterproduct').subscribe({
    next: (response) => {
      if (response.success == true) {
        this.ProductList = response.responseData;
        this.pro = this.ProductList;
        this.TotalAmount = 0;
        for (let index = 0; index < this.ProductList.length; index++) {
          const  element = this.proNamepipe.transform(this.ProductList[index].productName_Id);
          const element2 = this.proNamepipe.transform(this.ProductList[index].payFrom);
          this.ProductList[index].dop = this.datepipe.transform(this.ProductList[index].dop,'dd-MM-yyyy');
          const element3 = this.ProductList[index].amount;
          this.TotalAmount  +=element3;
        }
        
      } else {
        console.log('no product found');
      }
    },
  });
 }
 

  
    
          
}

