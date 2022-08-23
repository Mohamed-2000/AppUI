import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';
import { UserService } from './user.service';


 const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  redirectUrl: string = "";

  baseurl = "https://localhost:7216/api/Login/";
  isAuthenticated$ = new BehaviorSubject<boolean>(false);

  constructor(public http: HttpClient,public router: Router,
    public userService: UserService) {
        const authenticated = !!sessionStorage.getItem('access_token');
    this.isAuthenticated$.next(authenticated);
 }
 login(u: string, p: string) {
  let usr = {
    UserName: u,
    Password: p
  }
  return this.http.post<any>(this.baseurl, usr);
}

logIn() {
  this.isAuthenticated$.next(true);
}

logout() {
  this.isAuthenticated$.next(false);
}

getCurrentUser() {
  let usr = null;
  if (sessionStorage.getItem("access_token")) {
    usr = {
      "Id": helper.decodeToken(sessionStorage.getItem("access_token")?.toString()).Id,
      "Role": helper.decodeToken(sessionStorage.getItem("access_token")?.toString()).Role
    }
  }
  return usr;
}
DeleteToken() {
  sessionStorage.removeItem("access_token");
  this.isAuthenticated$.next(false);
}

}
