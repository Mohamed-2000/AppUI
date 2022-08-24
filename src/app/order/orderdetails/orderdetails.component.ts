import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrderProducts } from 'src/app/_models/order-products';
import { Product } from 'src/app/_models/product';
import { OrderProductsService } from 'src/app/_services/order-products.service';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.component.html',
  styleUrls: ['./orderdetails.component.css']
})
export class OrderdetailsComponent implements OnInit,OnChanges {

  @Input()  Id=0;
  orderProducts:OrderProducts[]=[];
  products:Product[]=[];
  constructor(public modalService: NgbModal,public orderProductsSer:OrderProductsService,public productSer:ProductService) { }
  ngOnChanges(){

    //data
    }

  ngOnInit(): void {
    this.orderProductsSer.getAll().subscribe(a=>{
this.orderProducts=[];
this.products=[];

      a.forEach(element => {
        if(element.order_Id==this.Id){
          this.productSer.getProductById(element.product_Id).subscribe(n=>{
            this.products.push(n);
          })
this.orderProducts.push(element);
        }

      });
      console.log(this.orderProducts)

    })
  }
  close(){
  this.modalService.dismissAll();
  }

}
