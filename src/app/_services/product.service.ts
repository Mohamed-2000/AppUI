import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../_models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseurl="https://localhost:7216/api/products/";
  imageurl = "https://localhost:7216/api/Image/";


  constructor(public http:HttpClient) { }

  getAllProducts(){
    return this.http.get<Product[]>(this.baseurl);
  }

  createProduct(product: Product){
  //  console.log(this.http.post<Product>(this.baseurl,product));
    return this.http.post<Product>(this.baseurl,product)
  }

 updateProduct(product:Product){
   return this.http.put<Product>(this.baseurl+product.id,product);
 }

 deleteProduct(id:Number){
   return this.http.delete(this.baseurl+id);
 }


 getProductById(id:number){
   return this.http.get<Product>(this.baseurl+id)
 }
 addImage(productId: number, img: FormData) {
  return this.http.post<any>(this.imageurl + productId, img);
}
}
