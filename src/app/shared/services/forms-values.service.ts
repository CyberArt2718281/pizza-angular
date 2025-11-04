import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormsValuesService {
  productTitle: string = '';
  address: string = '';
  phone: string = '';
  constructor() { }

  getFormValues(){
     return {
       product: this.productTitle,
       address: this.address,
       phone: this.phone,
     }
  }



}
