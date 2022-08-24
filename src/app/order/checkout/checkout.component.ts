import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'src/app/_models/cart';
import { Order } from 'src/app/_models/order';
import { OrderProducts } from 'src/app/_models/order-products';
import { Product } from 'src/app/_models/product';
import { AuthService } from 'src/app/_services/auth.service';
import { CartService } from 'src/app/_services/cart.service';
import { OrderProductsService } from 'src/app/_services/order-products.service';
import { OrderService } from 'src/app/_services/order.service';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor( public cartSer:CartService,
    public orderSer:OrderService,
    public router:Router,
    public auth:AuthService,
    public orderProducts:OrderProductsService,
    public productSer:ProductService
    ) { }
  userId:number=this.auth.getCurrentUser()?.Id;
  newOrder:Order=new Order(0,0,"","a",this.userId);
  // payment_Method
  payment_Methods:string[]=['Cash',"Credit Card"];
    totalPrice:number=0;
  producsInCart:Cart[]|any=[];
  isConfirmed:boolean=false;
  ngOnInit(): void {
    this.getProductsInCart()

  }
  clicka(){
    this.calcTotalPrice()
    this.newOrder.total_Price=this.totalPrice
    console.log(this.newOrder)
    this.isConfirmed=true;
    }
  getProductsInCart(){
    if(this.userId!=null){
      this.cartSer.getCustomerProductsInCart(this.userId).subscribe(a=>{
        console.log(a)
        this.producsInCart=a;
        a.forEach((element, index) => {
          if (element.product_Id != null) {
            this.productSer.getProductById(element.product_Id).subscribe((n) => {
              this.producsInCart[index] = Object.assign(this.producsInCart[index], {
                En_Name: n.en_Name,
                Ar_Name: n.ar_Name,
                Unitprice: n.price,
                TotalPrice: n.price*element.quantity,
                ProductImage:n.image
            });
            });
          }
        });
      })
    }
    // this.cartSer.getCustomerProductsInCart(this.userId).subscribe(async a=>{
    //   this.producsInCart=a;
    //   console.log(this.producsInCart)
    //   await a.forEach((element, index) => {
    //     if (element.product_Id != null) {
    //       this.productSer.getProductById(element.product_Id).subscribe((n) => {
    //         this.producsInCart[index] = Object.assign(this.producsInCart[index], {
    //           En_Name: n.en_Name,
    //           Ar_Name: n.ar_Name,
    //           Unitprice: n.price,
    //           TotalPrice: n.price*element.quantity,
    //           ProductImage:n.image
    //       });
    //       });
    //     }
    //   });
    //   this.producsInCart.forEach((e: { TotalPrice: number; })=>{
    //     this.totalPrice+=e.TotalPrice
    //   console.log(this.totalPrice)

    //   })
    //   console.log(this.totalPrice)
    //   // a.forEach(element => {
    //   //   this.productSer.getProductById(element.product_Id).subscribe(n=>{
    //   //     element
    //   //     // console.log(n)
    //   //     // this.totalPrice+=n.price*element.quantity;
    //   //     // console.log(n.price*element.quantity)
    //   //     //   console.log(this.totalPrice);
    //   //       })
    //   //       // console.log(this.totalPrice);


    //   // }

    //   // );


    //   })

  }
AddNewOrder(){
this.orderSer.createOrder(this.newOrder).subscribe(a=>{
  console.log(a)
this.AddProductsToOrder(a.id)
this.EmptyCart();

})
}
AddProductsToOrder(id:number){

      this.producsInCart.forEach((element: { product_Id: number; quantity: number; }) => {
        console.log(element)
         this.orderProducts.createOrder(new OrderProducts(element.product_Id,id,element.quantity)).subscribe(n=>{
           console.log(n);
         })
      });
    }


calcTotalPrice(){
this.producsInCart.forEach((element: { TotalPrice: number; }) => {
  this.totalPrice+=element.TotalPrice
});
}
EmptyCart(){
  this.cartSer.EmptyCartForCustomer(this.userId).subscribe(a=>{
    console.log(a)
        })
}
SelectedMethod(e:any){
  this.newOrder.payment_Method=this.payment_Methods[e.target.value];

}
Confirm(){
  this.AddNewOrder();
  this.router.navigateByUrl("/products")

}
}
