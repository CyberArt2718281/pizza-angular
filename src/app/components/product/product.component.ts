import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Product } from '../../interfaces/product.type';
import { TitleComponent } from '../title/title.component';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  // encapsulation: ViewEncapsulation.None,
})
export class ProductComponent {
  // @Input() // сам декоратор используется для передачи пропсов из родительского компонента в дочерний, через одностороннюю привязку

  // @Input() product!: Product;// оператор не нулевого утверждения
  // такой подход не рекомендуется так как можно получить ошибку в runtime к примеру не передав пропс в компонент

  // @Input() product?: Product; // Использование опционального свойства,
  // но тогда нужно будет в шаблоне использовать безопасный навигационный оператор (?.), иначе также получим ошибку в runtime

  // @Input() product: Product = {} as Product; // Использование приведения типа, но это может привести к ошибкам если не передать пропс, удобно если очень много свойств и есть огромная вложенность
  @Input() product: Product;
  // @Input()
  // get product(): Product {
  //   return this._product;
  // }
  // set product(param: Product) {
  //   param.title = param.title.toUpperCase();
  //   this._product = param;
  // }
  // private _product: Product;
  // не очень удобен если свойств много, так как нужно инициализировать все свойства, зато избавляет от всех ошибок в runtime

  @Output() addToCartEvent: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild(TitleComponent)
  private titleComponent!: TitleComponent;
  @ViewChild('elem')
  private elem!: ElementRef;

  constructor() {
    this.product = { title: '', description: '', image: '', dateTime: '' };
  }

  public addToCart() {
    this.addToCartEvent.emit(this.titleComponent.toUpper());
  }

}
