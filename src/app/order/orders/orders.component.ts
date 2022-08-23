import { Component, OnInit, ViewChild } from '@angular/core';
import { Order } from 'src/app/_models/order';
import { AuthService } from 'src/app/_services/auth.service';
import { OrderService } from 'src/app/_services/order.service';
import { MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(public orderSer:OrderService,public AuthService:AuthService) { }
id:number=0;
userOrders:Order[]=[];
@ViewChild(MatPaginator) paginator:MatPaginator|any;
  @ViewChild(MatSort) sort:MatSort|any;
  displayedColumns: string[] = ['Id','num','Address','Price','Method'];
datasource:any;
  ngOnInit(): void {

    this.orderSer.getAllOrders().subscribe(a=>{
      console.log(a);
      a.forEach(element => {
        if(element.customer_Id==this.AuthService.getCurrentUser()?.Id)
        this.userOrders.push(element);
      });
      this.datasource= new MatTableDataSource(this.userOrders);
      console.log(this.datasource)
      this.datasource.paginator=this.paginator;
      this.datasource.sort=this.sort;
      console.log(this.userOrders);

    })
  }

}
