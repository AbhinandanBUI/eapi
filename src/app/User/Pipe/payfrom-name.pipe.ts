import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'payfromName'
})
export class PayfromNamePipe implements PipeTransform {

  transform(value: number): string {
    if (value ==1) {
      return 'Paytm';
    }
    else if(value ==2) {
      return 'Phone Pay';
    }
    else if(value ==3) {
      return 'Google Pay';
    }
    else if(value ==4) {
      return 'Paytm Wallet';
    }
    else if(value ==5) {
      return 'Credit Card';
    }
    else if(value ==6) {
      return 'Debit Card';
    }
    else if(value ==7) {
      return 'UPI';
    }
    else if(value ==8) {
      return 'IMobile';
    }
    else if(value ==9) {
      return 'ICICI';
    }
    else if(value ==10) {
      return 'Amazon Pay';
    }
    else if(value ==11) {
      return 'Cash';
    }
    return 'other Bank';
  }

}
