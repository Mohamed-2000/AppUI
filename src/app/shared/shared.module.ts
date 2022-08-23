import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { ErrorComponent } from './error/error.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ErrorComponent
  ],
  imports: [
    CommonModule,RouterModule
  ],
  exports :[HeaderComponent,FooterComponent,HomeComponent]
})
export class SharedModule { }
