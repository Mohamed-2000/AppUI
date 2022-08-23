import { Injectable } from '@angular/core';
import { Category } from '../_models/category';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  baseurl="https://localhost:7216/api/categories/";

  constructor(public http: HttpClient) { }

  getAllCategories(){
    return this.http.get<Category[]>(this.baseurl);
  }

  createCategory(cat: Category){
   console.log(this.http.post<Category>(this.baseurl,cat));
    return this.http.post<Category>(this.baseurl,cat)
  }

 updateCategory(cat:Category){
   return this.http.put<Category>(this.baseurl+cat.id,cat);
 }

 deleteCategory(id:Number){
   return this.http.delete(this.baseurl+id);
 }


 getCategoryById(id:number){
   return this.http.get<Category>(this.baseurl+id)
 }
}
