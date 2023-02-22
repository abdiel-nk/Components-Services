import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import { PersonalPipe } from './pipes/personal.pipe';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { TransformPipe } from './pipes/transform.pipe';
import { FeaturesDirective } from './directives/features.directive';
import { ImgComponent } from './components/img/img.component';
import { ProductComponent } from './components/product/product.component';
import { ProductsComponent } from './components/products/products.component';
import { SwiperModule } from 'swiper/angular';



@NgModule({
  declarations: [
    FeaturesDirective,
    ProductComponent,
    ProductsComponent,
    TransformPipe,
    TimeAgoPipe,
    PersonalPipe,
    FeaturesDirective,
    ImgComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SwiperModule,

  ],
  exports: [
    FeaturesDirective,
    ProductComponent,
    ProductsComponent,
    TransformPipe,
    TimeAgoPipe,
    PersonalPipe,
    FeaturesDirective,
    ImgComponent
  ]
})
export class SharedModule { }
