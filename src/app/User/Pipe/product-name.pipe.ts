import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productName'
})
export class ProductNamePipe implements PipeTransform {

  transform(value: number,): string {
    if (value ==1) {
      return 'Breakfast';
    }
    else if(value ==2) {
      return 'Lunch';
    }
    else if(value ==3) {
      return 'Dinner';
    }
    else if(value ==4) {
      return 'Snakes';
    }
    else if(value ==5) {
      return 'Travelling';
    }
    else if(value ==6) {
      return 'Recharge';
    }
    else if(value ==7) {
      return 'Other';
    }
    else if(value ==8) {
      return 'Casual';
    }
    else if(value ==9) {
      return 'Cloth';
    }
    else if(value ==10) {
      return 'Juice';
    }
    else if(value ==11) {
      return 'Pg+';
    }
    return 'null';
  }

}
