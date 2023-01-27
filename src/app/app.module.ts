import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImgComponent } from './components/img/img.component';
import { ProductComponent } from './components/product/product.component';
import { ProductsComponent } from './components/products/products.component';
import { HeaderComponent } from './components/header/header.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PersonalPipe } from './pipes/personal.pipe';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { TransformPipe } from './pipes/transform.pipe';
import { FeaturesDirective } from './directives/features.directive';
import { SwiperModule } from 'swiper/angular';
import {TimeInterceptor} from  './interceptors/time.interceptor';
import {TokenInterceptor} from  './interceptors/token.interceptor';
@NgModule({
  declarations: [
    AppComponent,
    ImgComponent,
    ProductComponent,
    ProductsComponent,
    HeaderComponent,
    PersonalPipe,
    TimeAgoPipe,
    TransformPipe,
    FeaturesDirective
      ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SwiperModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: TimeInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
  ],
  bootstrap: [AppComponent],

})
export class AppModule { }
