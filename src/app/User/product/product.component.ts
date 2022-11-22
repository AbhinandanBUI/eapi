import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MasterService } from 'src/app/Service/master.service';
import { PayFrom, PayFromString, ProductName, ProductNameString } from 'src/app/Service/static';
import { ToasterService } from 'src/app/Service/Toaster/toaster.service';
import { TokenService } from 'src/app/Service/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  ProductList?: { Id: string; pname: string }[];
  PayFromList?: { Id: string; pname: string }[];
  fg: FormGroup = new FormGroup({});

  UProductList: any;
  userId: any;
  TotalAmount?: number;
  toCreationDate: any;
  toDueDate: any;
  toCrDate: any;

  constructor(private api: MasterService,
     private toaster: ToasterService,
     private token:TokenService,
     private fb: FormBuilder,
     ) {}
  ProductForm = new FormGroup({
    productName: new FormControl('0',[Validators.required,Validators.minLength(1)]),
    amount: new FormControl('',[Validators.required,Validators.minLength(1)]),
    payFrom: new FormControl('0',[Validators.required,Validators.minLength(1)]),
  });

  ngOnInit(): void {
    this.userId = (this.token.getUser()).userId;
    this.ProductList = ProductNameString;
    this.PayFromList = PayFromString;
    this.GetProduct();
  }

  GetProduct() {
    const data = {
      userId: this.userId,
    };
    this.api.post(data, 'product', 'allProduct').subscribe({
      next: (response) => {
        if (response.success == true) {
          this.UProductList = response.responseData;
          
        } else {
          console.log('no product found');
        }
      },
    });
  }
  // save product

  Save() {
    const data = {
      userId: this.userId,
      productName_Id: this.ProductForm.controls['productName'].value,
      amount: this.ProductForm.controls['amount'].value,
      monthId: new Date().getMonth() + 1,
      payFrom: this.ProductForm.controls['payFrom'].value,
    };
    if (this.ProductForm.controls['productName'].value == "0" ) {
      this.toaster.WarningMessage('Plz Select Product Name',1000);
    } else {
      if (this.ProductForm.controls['payFrom'].value == "0" ) {
        this.toaster.WarningMessage('Plz Select A Payment Type',1000);
      } else {
        this.api.post(data, 'product', 'addProduct').subscribe({
          next: (response) => {
            if (response.success == true) {
              this.toaster.SuccessMessage('Product Addedd Successfully', 2000);
              this.ProductForm.reset();
              this.ProductForm.patchValue({
                productName: '0',
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

  updateToOrderDate(event: any,Type:any) {
    let poDate = event.target.value.split("-");
    if (Type == 'fr') {
      if (this.toCreationDate != null) {
        this.toCreationDate.year = poDate[0];
        this.toCreationDate.month = poDate[1];
        this.toCreationDate.day = poDate[2];
      }
      
      this.fg.patchValue({
        toDate: poDate,
        
      });
     
    } else if (Type == 'du') {
      if (this.toDueDate != null) {
        this.toDueDate.year = poDate[0];
        this.toDueDate.month = poDate[1];
        this.toDueDate.day = poDate[2];
      }
      this.fg.patchValue({
        dutoDate: poDate,
        
      });
      
    } else
    {
      if (this.toCrDate != null) {
        this.toCrDate.year = poDate[0];
        this.toCrDate.month = poDate[1];
        this.toCrDate.day = poDate[2];
      }
      this.fg.patchValue({
        crtoDate: poDate,
        
      });
     
    }
    
    this.fg.updateValueAndValidity();

  }
 
}