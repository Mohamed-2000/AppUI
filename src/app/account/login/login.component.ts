import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from 'src/app/_services/auth.service';

const helper = new JwtHelperService();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userName: string = '';
  password: string = '';
  message = "";
  pass = "password";
  fa = "fa-eye";

  constructor(public router:Router,public AuthService: AuthService) { }

  ngOnInit(): void {
  }

  login() {
    this.AuthService.login(this.userName, this.password).subscribe(s => {
      sessionStorage.setItem("access_token", s.token);
      const decodedToken = helper.decodeToken(s.token);
      const expirationDate = helper.getTokenExpirationDate(s.token);
      const isExpired = helper.isTokenExpired(s.token);
      this.AuthService.logIn();
      console.log(s) //token
      console.log(decodedToken.Id)  //user Id
      console.log(expirationDate)
      console.log(isExpired)
      if (this.AuthService.redirectUrl != "") {
        this.router.navigate([this.AuthService.redirectUrl]);
        this.AuthService.redirectUrl = "";
      }
      else
      {

        this.router.navigateByUrl("/products").then(()=>{
    window.location.reload();
        })

      }


      if(this.AuthService.getCurrentUser()?.Role == "Admin"){
        this.router.navigateByUrl("/Inventory").then(()=>{
          window.location.reload();
              })

      }
      else
      {
        this.router.navigateByUrl("/products").then(()=>{
          window.location.reload();
              })

      }

    },
      error => {
        this.message = "Username and password incorrect";
        this.userName = '';
        this.password = '';
        console.log(error.error)
      }
    );
  }

}
