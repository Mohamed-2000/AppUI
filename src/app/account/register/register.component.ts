import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { User } from 'src/app/_models/user';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { myCustom } from 'src/app/_helpers/myCustom.validaton';
import { JwtHelperService } from "@auth0/angular-jwt";
const helper = new JwtHelperService();

// import { myCustomValidators } from 'src/app/_helpers/myCustom.validaton';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(public UserService:UserService, public modalService:NgbModal,public router:Router,public AuthService: AuthService) { }

  user:User=new User(0,"","","","","","","",false);
  AllUsers:User[]=[];
  EmailExistError:boolean=false;
  email:string="";
form =new FormGroup({
  firstName :new FormControl("",[Validators.required,Validators.minLength(3),Validators.maxLength(15)]),
  lastName :new FormControl("",[Validators.required,Validators.minLength(3),Validators.maxLength(15)]),
  email :new FormControl("",[CustomValidators.email,Validators.required]),
  userName :new FormControl("",[Validators.required,Validators.minLength(3),Validators.maxLength(15)]),
  password :new FormControl("",[Validators.required,Validators.minLength(8),Validators.maxLength(20)]),
  confirmPassword :new FormControl("",[Validators.required,Validators.minLength(8),Validators.maxLength(20)]),
  address :new FormControl(),
},
[myCustom.MatchValidator('password', 'confirmPassword'),
]
)

  ngOnInit(): void {
    this.UserService.getAllUsers().subscribe(a=>{
      this.AllUsers=a;
    })
  }

  Continue(){
//If Kolo Tmam
    this.user.fName=this.form.get('firstName')?.value;
    this.user.lName=this.form.get('lastName')?.value;
    this.user.email=this.form.get('email')?.value;
    this.user.userName=this.form.get('userName')?.value;
    this.user.password=this.form.get('password')?.value;
    this.user.address=this.form.get('address')?.value;
    // this.user.mobile=this.form.get('firstName')?.value;
    console.log(this.user)
    this.UserService.createUser(this.user).subscribe(a=>{
      console.log(a)
      this.login(this.user.userName, this.user.password);

    })
  }
  checkEmail(){
    console.log("Check")

    this.AllUsers.forEach(element => {
      // console.log(element)

      if (element.email==this.form.get('email')?.value)
      {
        console.log("hna")
        console.log(this.EmailExistError)
        this.EmailExistError=true;
        console.log(this.EmailExistError)

      }
      else
      this.EmailExistError=false;
    });

  }
  login(userName: string, pass: string) {
    this.AuthService.login(userName, pass).subscribe(s => {
      sessionStorage.setItem("access_token", s.token);
      const decodedToken = helper.decodeToken(s.token);
      const expirationDate = helper.getTokenExpirationDate(s.token);
      const isExpired = helper.isTokenExpired(s.token);
      // console.log(s)
      // console.log(decodedToken)
      // console.log(expirationDate)
      // console.log(isExpired)

      this.AuthService.logIn();
      this.router.navigateByUrl("/products")
      window.location.reload()


    },
      error => {
        console.log(error.error)
      }
    );
    console.log("above navigation route");
    return true;
  }
// get firstName(){
//   return this.form.get('firstName');
// }
get passwordMatchError() {
  return (
    this.form.getError('mismatch') &&
    this.form.get('confirmPassword')?.touched
  );
}


}
