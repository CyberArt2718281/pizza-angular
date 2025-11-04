import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';
import { Product } from '../../../../interfaces/product.type';
import { CartProductService } from '../../../shared/services/cart-product.service';
import { CartService } from '../../../shared/services/cart.service';
import { ProductService } from '../../../shared/services/product.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  product: Product;
  loading:boolean=  false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    public cartProductService: CartProductService,
    private cartService: CartService,
    private router: Router
  ) {
    this.product = {
      id: 0,
      title: '',
      description: '',
      image: '',
      dateTime: '',
    };
  }

  ngOnInit(): void {
    this.loading = true;
    this.activatedRoute.params
  
    .subscribe((params) => {
      if (params['id']) {
        this.productService
          .getProduct(+params['id'])
          .pipe(
            tap(() => {
              this.loading = false;
            })
          )
          .subscribe({
            next: (data) => {
              this.product = data;
            },
            error: (err) => {
              this.router.navigate(['/']);
            },
          });
      }
    });
  }

  addToCart(): void {
    // this.formsValuesService.productTitle = data.title;
    // this.cartService.product-card = data.title;
    if (!this.product) {
      return;
    }
    this.cartProductService.setCount(
      this.product.id.toString(),
      this.cartProductService.getCount(this.product.id.toString())
    );
    this.cartProductService.increment(this.product.id.toString());
    this.cartService.count++;
    // this.router.navigate(['/order'], {queryParams: {product-card: data.title}});
  }

  getProductIdString(): string | null {
    if (this.product) {
      return this.product.id.toString();
    }
    return null;
  }
}
