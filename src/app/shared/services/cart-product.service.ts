import {Injectable} from '@angular/core';
import {CartService} from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class CartProductService {
  private counts: { [productId: string]: number } = {};

  constructor(private cartService:CartService) { }
  getCommonCount(productId: string | null): string {
    if(productId=== null){
      return "Пицца не найдена"
    }
    return this.getCount(productId)  + '/' +  this.cartService.count;
  }
  getCount(productId: string): number {
    return this.counts[productId] || 0;
  }

  setCount(productId: string, count: number): void {
    this.counts[productId] = count;
  }

  increment(productId: string): void {
    this.counts[productId] = this.getCount(productId) + 1;
  }


}
