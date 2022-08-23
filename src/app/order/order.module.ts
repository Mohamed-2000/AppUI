import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders/orders.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ProductlistComponent } from './productlist/productlist.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';



@NgModule({
  declarations: [
    ProductlistComponent,
    OrdersComponent,
    ProductDetailsComponent,
    CartComponent,
    CheckoutComponent
  ],
  imports: [
    CommonModule,FormsModule,RouterModule,HttpClientModule,NgxPaginationModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule
  ]
})
export class OrderModule { }
