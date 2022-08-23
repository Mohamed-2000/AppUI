import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../_models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  baseurl="https://localhost:7216/api/Orders/";

  constructor(public http: HttpClient) { }

  getAllOrders(){
    return this.http.get<Order[]>(this.baseurl);
  }

  createOrder(order: Order){
    return this.http.post<Order>(this.baseurl,order)
  }

//  updateOrder(order:Order){
//    return this.http.put<Order>(this.baseurl+order.id,Order);
//  }




}
