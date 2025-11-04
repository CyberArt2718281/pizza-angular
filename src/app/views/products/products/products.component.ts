import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, tap } from 'rxjs';
import { Product } from '../../../../interfaces/product.type';
import { CartProductService } from '../../../shared/services/cart-product.service';
import { CartService } from '../../../shared/services/cart.service';
import { ProductService } from '../../../shared/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  loading: boolean = false;
  subsProducts: Subscription = new Subscription();
  constructor(
    private productService: ProductService,
    public cartService: CartService,
    private cartProductService: CartProductService,
    private router: Router,
  ) {}

  ngOnInit() {
    // this.products = this.productService.getProducts();
    this.loading = true;
    this.subsProducts = this.productService
      .getProducts$()
      // .pipe(
      //   // tap((result)=> {
      //   //   console.log(result);
      //   // }),
      //   // map((result) =>
      //   //   (result.data)
      //   // ),
      //   // catchError((error) => {
      //   //   throw new Error('omg')
      //   //   // return of([]);
      //   // }),
      //   // retry(3)
      // )
      .pipe(
        tap(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: (data) => {
          this.products = data;
        },
        error: (err) => {
          console.log(err);
          this.router.navigate(['/']);
        },
      });
  }
  ngOnDestroy(): void {
    this.subsProducts?.unsubscribe();
  }

  trackByIndex(index: number): number {
    return index;
  }

  addToCart(data: any): void {
    // this.formsValuesService.productTitle = data.title;
    // this.cartService.product-card = data.title;

    this.cartProductService.setCount(data.productId, data.count);
    this.cartProductService.increment(data.productId);
    this.cartService.count++;
    // this.router.navigate(['/order'], {queryParams: {product-card: data.title}});
  }
}
