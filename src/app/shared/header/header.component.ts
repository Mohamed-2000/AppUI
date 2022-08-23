import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { User } from 'src/app/_models/user';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { CartComponent } from 'src/app/order/cart/cart.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(
    public router: Router,
    public auth: AuthService,
    public userSer: UserService,
    public modalService: NgbModal,

  ) {}
  userId: number = this.auth.getCurrentUser()?.Id;
  user: User | any;
  Role:any=this.auth.getCurrentUser()?.Role;
  ngOnInit(): void {
    if (this.userId != null) {
      this.userSer.getUserById(this.auth.getCurrentUser()?.Id).subscribe((a) => {
        this.user = a;
        console.log(this.user)
        console.log(this.Role)
      });
    }
  }
  openCart(){
    if(this.userId!=null)
    this.modalService.open(CartComponent,   { size: 'lg' });
    else this.router.navigate(['/login/'])

  }
}
