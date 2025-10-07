# 🎯 ANGULAR ДИРЕКТИВЫ - ПОЛНЫЙ КОНСПЕКТ

## 📋 Содержание

1. [Что такое директивы](#1-что-такое-директивы)
2. [Типы директив](#2-типы-директив)
3. [Атрибутные директивы](#3-атрибутные-директивы)
4. [Структурные директивы](#4-структурные-директивы)
5. [Встроенные директивы](#5-встроенные-директивы)
6. [Практические примеры](#6-практические-примеры)
7. [Лучшие практики](#7-лучшие-практики)

---

## 1. ЧТО ТАКОЕ ДИРЕКТИВЫ

### Определение

> **Директива** - это класс в Angular, который добавляет определённое поведение к элементам DOM 🎭

```typescript
@Directive({
  selector: "[test]", // Применяется как атрибут
})
export class TestDirective {
  // Логика директивы
}
```

### Связь с компонентами

**💡 Важно понимать:** Любой компонент - это директива с шаблоном!

| Сущность      | Декоратор    | Шаблон  | Назначение              |
| ------------- | ------------ | ------- | ----------------------- |
| **Компонент** | `@Component` | ✅ Есть | Отображение UI + логика |
| **Директива** | `@Directive` | ❌ Нет  | Только поведение/логика |

### ❓ Какие директивы могут иметь HTML-шаблон?

**Ответ: ТОЛЬКО КОМПОНЕНТЫ!** 🎯

```typescript
// ✅ Компонент - МОЖЕТ иметь шаблон
@Component({
  selector: 'my-component',
  template: '<div>У меня есть шаблон!</div>'
})

// ❌ Атрибутная директива - НЕ может иметь шаблон
@Directive({
  selector: '[myDirective]'
  // Нет template/templateUrl - только логика
})

// ❌ Структурная директива - НЕ может иметь шаблон
@Directive({
  selector: '[myStructural]'
  // Управляет существующими шаблонами, но сама не имеет
})
```

---

## 2. ТИПЫ ДИРЕКТИВ

### По функциональности:

```
📦 ДИРЕКТИВЫ
├── 🧩 Компоненты (Component Directives)
├── 🏷️ Атрибутные (Attribute Directives)
└── 🏗️ Структурные (Structural Directives)
```

### По происхождению:

| Тип            | Описание           | Примеры                      |
| -------------- | ------------------ | ---------------------------- |
| **Встроенные** | Готовые из Angular | `*ngIf`, `*ngFor`, `ngModel` |
| **Кастомные**  | Созданные вами     | Ваши директивы               |

---

## 3. АТРИБУТНЫЕ ДИРЕКТИВЫ

### Что это: Изменяют поведение существующих элементов

> **Как наклейка на элемент** - не меняет структуру, только поведение 🏷️

### 3.1 Создание атрибутной директивы

**Пример из вашего кода: `PatternInputDirective`**

```typescript
@Directive({
  selector: "[inputOrder]", // Используется как <input inputOrder>
})
export class PatternInputDirective implements OnInit {
  // Входные параметры
  @Input() inputOrderDefaultBorderColor: string = "rgb(185, 145, 80)";
  @Input() inputOrderFocusBorderColor: string = "rgba(57, 36, 2, 1)";

  // Исходящие события
  @Output() directiveTextEvent = new EventEmitter<string>();

  constructor(private el: ElementRef, private rend: Renderer2) {}
}
```

### 3.2 HostListener - Слушаем события

```typescript
@HostListener('focus', ['$event.target'])
onFocus(target: HTMLElement) {
  // Эмитим событие с информацией
  this.directiveTextEvent.emit(`Focus на элемент ${target.id}`);

  // Меняем стиль
  this.changeElementBorderColor(this.inputOrderFocusBorderColor);
  this._isOnFocus = true;
}

@HostListener('blur')
onBlur() {
  this.changeElementBorderColor(this.inputOrderDefaultBorderColor);
  this._isOnFocus = false;
}

@HostListener('click', ['$event', '$event.target'])
onClick(event: Event, target: HTMLElement) {
  console.log('Событие:', event);
  console.log('Элемент:', target);
}
```

### 3.3 HostBinding - Привязываем к свойствам DOM

```typescript
private _bgColor: string = '';
private _isOnFocus: boolean = false;

// Привязка к CSS свойству
@HostBinding('style.borderColor')
get getBgColor() {
  return this._bgColor;
}

// Привязка к CSS классу
@HostBinding('class.isOnFocus')
get getIsOnFocus() {
  return this._isOnFocus;
}
```

### 3.4 Использование в HTML

```html
<input inputOrder <!-- Применяем директиву -- /> (directiveTextEvent)='showDirectiveText($event)'
<!-- Слушаем события -->
[inputOrderDefaultBorderColor]="'rgb(185, 145, 80)'"
<!-- Передаём параметры -->
[inputOrderFocusBorderColor]="'red'" [(ngModel)]="formValues.productTitle" id="product-input" />
```

### 3.5 Обработка в компоненте

```typescript
showDirectiveText(message: string): void {
  console.log('Получили от директивы:', message);
  // Логика обработки сообщения
}
```

---

## 4. СТРУКТУРНЫЕ ДИРЕКТИВЫ

### Что это: Изменяют структуру DOM

> **Как строитель** - добавляют/удаляют элементы из DOM 🏗️

### 4.1 Создание структурной директивы

**Пример из вашего кода: `IsChickenDirective`**

```typescript
@Directive({
  selector: "[isChicken]", // *isChicken в шаблоне
})
export class IsChickenDirective {
  @Input() isChicken: string = "";

  constructor(
    private templateRef: TemplateRef<any>, // Шаблон для вставки
    private viewContainer: ViewContainerRef // Контейнер для вставки
  ) {}

  ngOnInit() {
    if (this.isChicken.toLowerCase().includes("курица")) {
      // Показываем элемент
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      // Скрываем элемент
      this.viewContainer.clear();
    }
  }
}
```

### 4.2 Использование структурной директивы

```html
<!-- Элемент показывается только если в описании есть "курица" -->
<div class="product-item" *isChicken="product.description">
  <div class="product-image">
    <img src="assets/images/{{ product.image }}" alt="{{ product.title }}" />
  </div>
  <custom-title [title]="product.title"></custom-title>
  <div class="product-text">{{ product.description }}</div>
  <!-- ... остальной контент ... -->
</div>
```

### 4.3 Альтернативная реализация через setter

```typescript
// Закомментированный код из вашего примера (альтернативный подход):
// set isChicken(description: string) {
//   if (description.toLowerCase().includes('курица')) {
//     this.viewContainer.createEmbeddedView(this.templateRef);
//   } else {
//     this.viewContainer.clear();
//   }
// }
```

---

## 5. ВСТРОЕННЫЕ ДИРЕКТИВЫ

### 5.1 Структурные директивы

#### `*ngIf` - Условное отображение

```html
<!-- Из вашего кода: условное отображение изображений -->
<div *ngIf="product.image; then productImageBlock else defaultImageBlock"></div>

<ng-template #productImageBlock>
  <div class="product-image">
    <img src="assets/images/{{ product.image }}" alt="{{ product.title }}" />
  </div>
</ng-template>

<ng-template #defaultImageBlock>
  <div class="product-image">
    <img src="assets/images/pizza-form.png" alt="{{ product.title }}" />
  </div>
</ng-template>
```

#### `*ngFor` - Циклы

```html
<!-- Из вашего кода: отображение списка продуктов -->
<product *ngFor="let product of products; let i = index; trackBy: trackByProduct" [product]="product" (addToCartEvent)="addToCart($event, order)"> </product>
```

### 5.2 Атрибутные директивы

#### `ngModel` - Двустороннее связывание

```html
<!-- Из вашего кода: форма заказа -->
<input [(ngModel)]="formValues.productTitle" name="productTitle" type="text" placeholder="Пицца" />

<input [(ngModel)]="formValues.address" name="address" type="text" placeholder="Адрес доставки" />

<input [(ngModel)]="formValues.phone" name="phone" type="text" placeholder="+7 (999) 999-99-99" pattern="^\+7\s\(9\d{2}\)\s\d{3}-\d{2}-\d{2}" />
```

---

## 6. ПРАКТИЧЕСКИЕ ПРИМЕРЫ

### 6.1 Класс Renderer2 для работы с DOM

```typescript
constructor(private el: ElementRef, private rend: Renderer2) {}

ngOnInit() {
  // Устанавливаем начальный цвет границы
  this.changeElementBorderColor(this.inputOrderDefaultBorderColor);

  // Изменяем placeholder, добавляя звёздочку
  this.rend.setAttribute(
    this.el.nativeElement,
    'placeholder',
    this.el.nativeElement.getAttribute('placeholder') + '*'
  );

  // Закомментированный код - создание дополнительного элемента:
  // const text = this.rend.createElement('span');
  // this.rend.setProperty(text, 'innerText', '*Обязательно для заполнения')
  // this.rend.setStyle(text, 'color', 'red');
  // this.rend.insertBefore(this.el.nativeElement.parentElement, text, this.el.nativeElement)
}

changeElementBorderColor(color: string) {
  this._bgColor = color;  // Используется через @HostBinding
}
```

### 6.2 Передача значений в директиву

```html
<!-- Передача параметров через Input -->
<div inputOrder [inputOrderDefaultBorderColor]="'rgb(185, 145, 80)'" [inputOrderFocusBorderColor]="'red'"></div>
```

```typescript
@Directive({
  selector: "[inputOrder]",
})
export class InputOrderDirective {
  @Input() inputOrderDefaultBorderColor: string = "rgb(185, 145, 80)";
  @Input() inputOrderFocusBorderColor: string = "rgba(57, 36, 2, 1)";
}
```

### 6.3 Комбинирование директив

```html
<!-- Пример комбинирования нескольких директив на одном элементе -->
<input inputOrder <!-- Кастомная директива -- />
[(ngModel)]="formValues.productTitle"
<!-- Встроенная директива -->
[inputOrderDefaultBorderColor]="'rgb(185, 145, 80)'" (directiveTextEvent)='showDirectiveText($event)' required
<!-- HTML атрибут -->
class="order-input"
<!-- CSS класс -->
/>
```

---

## 7. ЛУЧШИЕ ПРАКТИКИ

### ✅ Хорошие практики

#### 1. **Чёткие имена селекторов**

```typescript
// ✅ ХОРОШО - понятно, что делает
@Directive({ selector: '[inputValidation]' })
@Directive({ selector: '[highlightOnHover]' })

// ❌ ПЛОХО - непонятно
@Directive({ selector: '[test]' })
@Directive({ selector: '[dir1]' })
```

#### 2. **Типизация событий**

```typescript
// ✅ ХОРОШО - чётко указан тип
@Output() directiveTextEvent = new EventEmitter<string>();

// ❌ ИЗБЕГАТЬ - слишком общий тип
@Output() directiveTextEvent = new EventEmitter<any>();
```

#### 3. **Использование Renderer2 вместо прямого DOM**

```typescript
// ✅ ХОРОШО - безопасно и универсально
this.rend.setStyle(this.el.nativeElement, "borderColor", color);

// ❌ ПЛОХО - прямое обращение к DOM
this.el.nativeElement.style.borderColor = color;
```

#### 4. **Очистка ресурсов**

```typescript
export class MyDirective implements OnDestroy {
  private subscription: Subscription;

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
```

### ⚠️ Частые ошибки

#### 1. **Забывают объявить в module**

```typescript
@NgModule({
  declarations: [
    PatternInputDirective,  // ✅ Не забудь добавить!
    IsChickenDirective
  ],
})
```

#### 2. **Неправильный импорт EventEmitter**

```typescript
// ❌ НЕПРАВИЛЬНО
import { EventEmitter } from "events";

// ✅ ПРАВИЛЬНО
import { EventEmitter } from "@angular/core";
```

#### 3. **Структурные директивы без \* в шаблоне**

```html
<!-- ❌ НЕПРАВИЛЬНО -->
<div isChicken="product.description">
  <!-- ✅ ПРАВИЛЬНО -->
  <div *isChicken="product.description"></div>
</div>
```

---

## 📚 ШПАРГАЛКА

### Декораторы директив:

- `@Input()` - получение параметров
- `@Output()` - отправка событий
- `@HostListener()` - слушание событий элемента
- `@HostBinding()` - привязка к свойствам DOM

### Инжекции для директив:

- `ElementRef` - ссылка на DOM элемент
- `Renderer2` - безопасная работа с DOM
- `TemplateRef` - шаблон для структурных директив
- `ViewContainerRef` - контейнер для вставки

### Синтаксис в шаблонах:

- `[myDirective]` - атрибутная директива
- `*myDirective` - структурная директива
- `(eventName)="handler()"` - события директивы
- `[propertyName]="value"` - параметры директивы

---

## 🎯 ПРЕИМУЩЕСТВА ДИРЕКТИВ

### 1. **Переиспользование кода**

Одну директиву можно применить к любому элементу:

```html
<input inputOrder>
<textarea inputOrder>
<select inputOrder>
```

### 2. **Разгрузка компонентов**

Вместо логики в компоненте:

```typescript
// ❌ Много логики в компоненте
export class MyComponent {
  onFocus() {
    /* логика фокуса */
  }
  onBlur() {
    /* логика blur */
  }
  onChange() {
    /* логика изменения */
  }
}
```

Используем директиву:

```typescript
// ✅ Компонент чистый, логика в директиве
export class MyComponent {
  // Только основная бизнес-логика
}
```

### 3. **Инкапсуляция поведения**

Директива содержит всю логику работы с конкретным поведением, что делает код более организованным и понятным.

---

**🚀 Директивы - это мощный инструмент Angular для создания переиспользуемого поведения. Изучайте, практикуйтесь и создавайте крутые решения!**
