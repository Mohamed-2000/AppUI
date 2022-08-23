import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Vendor } from '../_models/vendor';

@Injectable({
  providedIn: 'root'
})
export class VendorService {
  baseurl="https://localhost:7216/api/Vendors/";

  constructor(public http:HttpClient) { }

  getAllVendors(){
    return this.http.get<Vendor[]>(this.baseurl);
  }

 getVendorById(id:number){
   return this.http.get<Vendor>(this.baseurl+id)
 }
}
