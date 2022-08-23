import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccountModule } from './account/account.module';
import { JwtModule } from '@auth0/angular-jwt';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { OrderModule } from './order/order.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


export function TokenGetter() {
  return sessionStorage.getItem("access_token");
}


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    CategoryModule,
    ProductModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
    AccountModule,
    OrderModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: TokenGetter,

        allowedDomains: ["localhost:7216"],
        disallowedRoutes: [],
      }
    }),
    NgbModule

   ],

  providers: [
    {

      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },],
  bootstrap: [AppComponent]
})
export class AppModule { }
