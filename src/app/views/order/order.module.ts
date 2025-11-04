import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import {OrderRoutingModule} from './order-routing.module';
import {OrderComponent} from './order.component';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule} from '@angular/forms';
import {InputTextModule} from "primeng/inputtext";
import {TuiButtonModule} from "@taiga-ui/core";


@NgModule({
  declarations: [OrderComponent],
  imports: [
    CommonModule,
    OrderRoutingModule,
    SharedModule,
    FormsModule,
    NgOptimizedImage,
    InputTextModule,

    TuiButtonModule

  ],
  exports: [
    OrderRoutingModule
  ]
})
export class OrderModule {}
