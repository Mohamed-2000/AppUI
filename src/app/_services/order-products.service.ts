import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderProducts } from '../_models/order-products';

@Injectable({
  providedIn: 'root'
})
export class OrderProductsService {
  baseurl="https://localhost:7216/api/Products_Order/";

  constructor(public http: HttpClient) { }
  getAll(){
    return this.http.get<OrderProducts[]>(this.baseurl);
  }

  createOrder(order: OrderProducts){
    return this.http.post<OrderProducts>(this.baseurl,order)
  }

//  updateOrder(order:Order){
//    return this.http.put<Order>(this.baseurl+order.id,Order);
//  }




}
