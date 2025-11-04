import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {RouterModule} from '@angular/router';

import {IsChickenDirective} from './directives/is-chicken.directive';
import {PatternInputDirective} from './directives/pattern-input.directive';
import {ChickenDescriptionPipe} from './pipes/chicken-description.pipe';
import {ChickenProductsPipe} from './pipes/chicken-products.pipe';
import {WordUpperPipe} from './pipes/word-upper.pipe';
import {ProductCardComponent} from './components/product-card/product-card.component';
import {TitleComponent} from './components/title/title.component';
import {PopupComponent} from './components/popup/popup.component';


@NgModule({
  declarations: [
    ProductCardComponent,
    TitleComponent,
    IsChickenDirective,
    PatternInputDirective,
    ChickenDescriptionPipe,
    WordUpperPipe,
    ChickenProductsPipe,
    PopupComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    ProductCardComponent,
    TitleComponent,
    IsChickenDirective,
    PatternInputDirective,
    ChickenDescriptionPipe,
    WordUpperPipe,
    ChickenProductsPipe,
    PopupComponent,


  ],
})
export class SharedModule {}
