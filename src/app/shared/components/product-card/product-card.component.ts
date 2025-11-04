import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Product } from '../../../../interfaces/product.type';
import { CartProductService } from '../../services/cart-product.service';
import { TitleComponent } from '../title/title.component';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  // encapsulation: ViewEncapsulation.None,
})
export class ProductCardComponent {
  // @Input() // сам декоратор используется для передачи пропсов из родительского компонента в дочерний, через одностороннюю привязку

  // @Input() product-card!: Product;// оператор не нулевого утверждения
  // такой подход не рекомендуется так как можно получить ошибку в runtime к примеру не передав пропс в компонент

  // @Input() product-card?: Product; // Использование опционального свойства,
  // но тогда нужно будет в шаблоне использовать безопасный навигационный оператор (?.), иначе также получим ошибку в runtime

  // @Input() product-card: Product = {} as Product; // Использование приведения типа, но это может привести к ошибкам если не передать пропс, удобно если очень много свойств и есть огромная вложенность
  @Input() product: Product;
  // @Input()
  // get product-card(): Product {
  //   return this._product;
  // }
  // set product-card(param: Product) {
  //   param.title = param.title.toUpperCase();
  //   this._product = param;
  // }
  // private _product: Product;
  // не очень удобен если свойств много, так как нужно инициализировать все свойства, зато избавляет от всех ошибок в runtime
  @Output() addToCartEvent: EventEmitter<{
    productId: string;
    title?: string;
    count: number;
  }> = new EventEmitter<{ productId: string; title?: string; count: number }>();
  @ViewChild(TitleComponent)
  private titleComponent!: TitleComponent;
  @ViewChild('elem')
  private elem!: ElementRef;
  constructor(public cartProductService: CartProductService) {
    this.product = {
      id: 0,
      title: '',
      description: '',
      image: '',
      dateTime: '',
    };
  }

  getProductId(): string {
    return this.product.id.toString();
  }

  public addToCart(): void {
    const data = {
      productId: this.product.id.toString(),
      count: this.cartProductService.getCount(this.product.id.toString()),
    };
    this.addToCartEvent.emit(data);
  }
}
