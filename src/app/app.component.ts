import { Component, OnInit } from '@angular/core';
import { Product } from './interfaces/product.type';
import { Priority } from './interfaces/priority.type'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public trackByProduct(index: number, product: Product): string {
    return product.title + product.image;
  }

  public products: Product[] = [
    {
      title: 'Морская Премиум',
      description:
        'Пепперони, лук, бекон, томатная паста, колбаски, перец, грибы, соус, ананасы',
      image: 'product-1.png',
      dateTime: '2024-12-31 15:00:00',
    },
    {
      title: 'Морская Премиум',
      description: 'Перец, сыр, креветки, кальмары, мидии, лосось',
      image: '',
      dateTime: '2024-12-23 15:00:00',
    },
    {
      title: 'Бекон и Сосиски',
      description: 'Бекон, сосиски, сыр, соус',
      image: 'Layer 3.png',
      dateTime: '2024-12-31 15:00:00',
    },
    {
      title: 'Куриная Делюкс',
      description: 'Куриное филе, грибы, сыр, соус',
      image: 'Layer 4.png',
      dateTime: '2025-05-12 15:00:00',
    },
    {
      title: 'Барбекю Премиум',
      description: 'Курица, бекон, лук, соус барбекю',
      image: 'Layer 5.png',
      dateTime: '2025-01-10 15:00:00',
    },
    {
      title: 'Пепперони Дабл',
      description: 'Пепперони, сыр, колбаса 2 видов: обжаренная и вареная',
      image: 'Layer 6.png',
      dateTime: '2023-03-20 15:00:00',
    },
    {
      title: 'Куриное трио',
      description:
        'Жареная курицаА, Тушеная курица, Куриные наггетсы, перец, сыр, грибы, соус для',
      image: 'Layer 7.png',
      dateTime: '2025-12-12 15:00:00',
    },
    {
      title: 'Сырная',
      description: 'Сыр Джюгас, Сыр с плесенью, Сыр Моцарелла, Сыр секретный',
      image: 'Layer 8.png',
      dateTime: '2025-09-12 15:00:00',
    },
  ];
  public formValues = {
    productTitle: '',
    address: '',
    phone: '',
  };
  public scrollTo(target: HTMLElement | string): void {
    let element: HTMLElement | null;

    if (typeof target === 'string') {
      element = document.getElementById(target);
    } else {
      element = target;
    }

    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
  public addToCart(title: string, order: HTMLElement | string): void {
    this.scrollTo(order);
    this.formValues.productTitle = title;
  }

  public createOrder(): void {
    if (!this.formValues.productTitle) {
      alert('Введите корректное название пиццы');
      return;
    }

    if (!this.formValues.address) {
      alert('Введите адрес');
      return;
    }

    if (!this.formValues.phone.match(/^[а-яА-Я0-9,\.\s]+$/)) {
      alert('Введите телефон');
      return;
    }
    alert('Спасибо за заказ! Скоро мы с вами свяжемся!');
    this.formValues = {
      productTitle: '',
      address: '',
      phone: '',
    };
  }
  showDirectiveText(text: string) {
    console.log(text);
  }

  lateData: Promise<string> | null = null;
  ngOnInit() {
    this.lateData = new Promise((resolve) => {
      setTimeout(() => {
        resolve('Данные загрузились!');
      }, 3000);
    });
  }

  object: Object = {
    foo: 'bar',
    baz: 'qux',
    nested: { xyz: 3, numbers: [1, 2, 3, 4, 5] },
  };
  
}
