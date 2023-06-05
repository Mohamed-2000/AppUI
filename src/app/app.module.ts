import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccountModule } from './account/account.module';
import { JwtModule } from '@auth0/angular-jwt';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
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

    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
    AccountModule,
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
