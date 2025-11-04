import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import {HomeRoutingModule} from './home-routing.module';
import {AboutComponent} from './about/about.component';
import {MainComponent} from './main/main.component';
import {SharedModule} from '../../shared/shared.module';
import {NgbModalModule} from "@ng-bootstrap/ng-bootstrap";
import { RouterModule } from '@angular/router'

@NgModule({
  declarations: [AboutComponent, MainComponent],
  imports: [CommonModule, HomeRoutingModule, NgOptimizedImage, SharedModule,
  NgbModalModule,RouterModule
  ],
  exports: [
    HomeRoutingModule
  ]
})
export class HomeModule {
}
