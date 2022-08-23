import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/_models/cart';
import { AuthService } from 'src/app/_services/auth.service';
import { CartService } from 'src/app/_services/cart.service';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
ProductsInCart:Cart[]|any=[];
userId:number=this.auth.getCurrentUser()?.Id;
  constructor(public cartser:CartService,public auth:AuthService,public proser:ProductService) { }

  ngOnInit(): void {
    if(this.userId!=null){
      this.cartser.getCustomerProductsInCart(this.userId).subscribe(a=>{
        console.log(a)
        this.ProductsInCart=a;
        a.forEach((element, index) => {
          if (element.product_Id != null) {
            this.proser.getProductById(element.product_Id).subscribe((n) => {
              this.ProductsInCart[index] = Object.assign(this.ProductsInCart[index], {
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
  }
  EmptyCart(){ if( confirm('Are you sure you want to Empty The Cart?'))
  {
    this.cartser.EmptyCartForCustomer(this.userId).subscribe(a=>{
console.log(a)
this.ngOnInit();
    })
  }}
  RemoveItem(id:number)
  {
    if( confirm('Are you sure you want to Delete?'))
    {
      this.cartser.deleteProductFromCart(this.userId,id).subscribe(a=>{
        this.ngOnInit();
  console.log(a)
      })
    }

  }
}
