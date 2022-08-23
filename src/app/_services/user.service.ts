import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseurl = "https://localhost:7216/api/Users/";

  constructor(public http:HttpClient) { }
getAllUsers(){
  return this.http.get<User[]>(this.baseurl);
}

createUser(user: User){
//  console.log(this.http.post<Product>(this.baseurl,product));
  return this.http.post<User>(this.baseurl,user)
}

updateUser(user:User){
 return this.http.put<User>(this.baseurl+user.id,user);
}

deleteUser(id:Number){
 return this.http.delete(this.baseurl+id);
}


getUserById(id:number){
 return this.http.get<User>(this.baseurl+id)
}
}

