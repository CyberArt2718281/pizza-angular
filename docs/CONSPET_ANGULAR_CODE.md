# Конспект по проекту (примеры из кода)

Краткий конспект основных концепций Angular с примерами из проекта `pizza-angular`.

---

## Содержание

- Модули (NgModule)
- Компоненты
- Шаблоны и привязки
- Директивы и пайпы
- Dependency Injection и Providers
- Работа с assets (изображения)
- Формы и ngModel

---

## Модули (NgModule)

В проекте есть `AppModule` и `SharedModule`. Пример `SharedModule` (файл: `src/app/shared/shared.module.ts`):

```typescript
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { IsChickenDirective } from "./directives/is-chicken.directive";
import { PatternInputDirective } from "./directives/pattern-input.directive";
import { ChickenDescriptionPipe } from "./pipes/chicken-description.pipe";
import { ChickenProductsPipe } from "./pipes/chicken-products.pipe";
import { WordUpperPipe } from "./pipes/word-upper.pipe";
import { ProductCardComponent } from "./components/product-card/product-card.component";
import { TitleComponent } from "./components/title/title.component";

@NgModule({
  declarations: [ProductCardComponent, TitleComponent, IsChickenDirective, PatternInputDirective, ChickenDescriptionPipe, WordUpperPipe, ChickenProductsPipe],
  imports: [CommonModule, RouterModule],
  exports: [ProductCardComponent, TitleComponent, IsChickenDirective, PatternInputDirective, ChickenDescriptionPipe, WordUpperPipe, ChickenProductsPipe],
})
export class SharedModule {}
```

Почему `CommonModule` импортируется в feature-модулях:

- `CommonModule` предоставляет стандартные директивы и пайпы (`*ngIf`, `*ngFor`, `ngClass`, `date` и т.д.).
- `BrowserModule` импортируется только в `AppModule`.

---

## Компоненты

Пример компонента `TitleComponent` (файл: `src/app/shared/components/title/title.component.ts`):

```typescript
import { Component, Input } from "@angular/core";

@Component({
  selector: "custom-title",
  templateUrl: "./title.component.html",
  styleUrls: ["./title.component.scss"],
})
export class TitleComponent {
  @Input() title: string | undefined = "";

  toUpper() {
    return this.title?.toUpperCase();
  }
  toLower() {
    return this.title?.toLowerCase();
  }
}
```

Важно: селектор компонента (`selector`) должен совпадать с используемым в шаблонах, например `<custom-title [title]="product.title"></custom-title>`.

---

## Шаблоны и привязки

Примеры из `product.component.html`:

```html
<ng-template #productImageBlock>
  <div class="product-image">
    <img src="assets/images/pizza-form.png" alt="{{ product.title }}" />
  </div>
</ng-template>

<custom-title [title]="product.title"></custom-title>
<div class="product-text">{{ product.description }}</div>
```

Привязки к свойствам: `{{ ... }}` — интерполяция; `[title]="..."` — binding входного параметра.

---

## Директивы и пайпы

В `SharedModule` объявлены директивы и пайпы, которые экспортируются для повторного использования:

- `IsChickenDirective` — пример attribute-директивы
- `PatternInputDirective` — директива валидации/форм
- `ChickenDescriptionPipe`, `WordUpperPipe`, `ChickenProductsPipe` — пайпы для форматирования текста

Использование пайпа в шаблоне (пример):

```html
<div class="product-text">{{ product.description | wordUpper:["сыр","томат","сос"] }}</div>
```

---

## Dependency Injection и Providers

Provider — это механизм, который сообщает DI-контейнеру, как создавать и предоставлять зависимости (сервисы). При обращении к токену DI проверяет, существует ли уже экземпляр; если да — возвращает его, иначе создаёт новый по правилам, описанным в Provider.

Советы по регистрации сервисов:

- `providedIn: 'root'` — сервис доступен глобально (рекомендуемый способ)
- Добавление сервиса в `providers` модуля делает его скоупом этого модуля (и его декларациям)

---

## Работа с assets (изображения)

Файлы изображений находятся в `src/assets/images/`.
В шаблонах путь указывается относительно корня сборки:

```html
<img src="assets/images/pizza-form.png" alt="pizza" />
```

Проверьте `angular.json`, чтобы убедиться, что `src/assets` включены в сборку:

```json
"assets": ["src/assets", "src/favicon.ico"]
```

Советы:

- В Linux пути чувствительны к регистру
- Перезапускайте `ng serve` после добавления новых файлов

---

## Формы и ngModel

Пример из `order.component.html`:

```html
<input type="text" placeholder="Пицца" class="order-input" [value]="formValues.product" [(ngModel)]="formValues.product" name="product" />
```

Чтобы `[(ngModel)]` работал, модуль должен импортировать `FormsModule` (обычно в `AppModule` или feature-модуле):

```typescript
import { FormsModule } from '@angular/forms';
@NgModule({ imports: [FormsModule] })
```

---

## Заключение

Созданный файл собирает ключевые примеры из проекта и объясняет, как они работают. По желанию могу дополнить конспект разделами про маршрутизацию (routing), lazy-loaded модули, unit-тесты и оптимизацию сборки.

---

_Сгенерировано автоматически на основе файлов проекта._
