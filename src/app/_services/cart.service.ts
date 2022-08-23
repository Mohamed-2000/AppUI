import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cart } from '../_models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  baseurl="https://localhost:7216/api/Cart/";

  constructor(public http: HttpClient) { }

  // getAllCategories(){
  //   return this.http.get<Category[]>(this.baseurl);
  // }

  getCustomerProductsInCart(id:number){
    return this.http.get<Cart[]>(this.baseurl+id)
  }

  AddProductToCart(cart: Cart){
  //  console.log(this.http.post<Category>(this.baseurl,cat));
    return this.http.post<Cart>(this.baseurl,cart)
  }

 UpdateProductInCart(cart:Cart){
   return this.http.put<Cart>(this.baseurl+cart.user_Id+"/"+cart.product_Id,cart);
 }

 EmptyCartForCustomer(id :Number){
  return this.http.delete(this.baseurl+id);
}

 deleteProductFromCart(u_id :Number,p_id :number){
   return this.http.delete(this.baseurl+u_id+"/"+p_id);
 }

}
