import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormValues } from '../../../interfaces/formValues';
import { FormsValuesService } from '../../shared/services/forms-values.service';
import { ProductService } from '../../shared/services/product.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit, OnDestroy {
  formValues!: FormValues;
  private subscription: Subscription | null = null;

  subsOrder: Subscription = new Subscription();
  constructor(
    private formsValuesService: FormsValuesService,
    // public cartService:CartService,
    private activatedRoute: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.formValues = this.formsValuesService.getFormValues();
    this.subscription = this.activatedRoute.queryParams.subscribe((params) => {
      if (params['product']) {
        this.formValues.product = params['product'];
      }
    });
    // const productParam = this.activatedRoute.snapshot.queryParamMap.get('product')
    // if(productParam){
    //   this.formValues.product= productParam;
    // }
  }

  ngOnDestroy(): void {
    this.subsOrder?.unsubscribe();
    this.subscription?.unsubscribe();
  }
  createOrder(): void {
    console.log(this.formValues);
    if (!this.formValues.product) {
      alert('Введите корректное название пиццы');
      return;
    }

    if (!this.formValues.address) {
      alert('Введите адрес');
      return;
    }

    if (!this.formValues.phone.match(/^[а-яА-Я0-9,/.\s]+$/)) {
      alert('Введите телефон');
      return;
    }
    this.subsOrder = this.productService
      .createOrder(this.formValues)
      .subscribe((response) => {
        if (response.success && !response.message) {
          alert('Спасибо за заказ!');
          this.formValues = {
            product: '',
            address: '',
            phone: '',
          };
        } else {
          alert('Ошибка!');
        }
      });
  }
}
