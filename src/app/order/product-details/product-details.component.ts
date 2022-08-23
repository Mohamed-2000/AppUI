import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart } from 'src/app/_models/cart';
import { Product } from 'src/app/_models/product';
import { AuthService } from 'src/app/_services/auth.service';
import { CartService } from 'src/app/_services/cart.service';
import { CategoryService } from 'src/app/_services/category.service';
import { ProductService } from 'src/app/_services/product.service';
import { VendorService } from 'src/app/_services/vendor.service';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  constructor(
    public ar:ActivatedRoute,
    public router:Router,
    public prodSer:ProductService,
    public catSer:CategoryService,
    public vendorSer:VendorService,
    public auth:AuthService,
    public cartSer:CartService,
    public modalService: NgbModal,


    ) { }
id:number=0;
product:Product|any;
newQuantity:number=1;
userId:number=this.auth.getCurrentUser()?.Id;

  ngOnInit(): void {
    this.id = this.ar.snapshot.params['id'];
    this.prodSer.getProductById(this.id).subscribe(a=>{
      this.product=a;
      if (a.category_Id != null) {
        this.catSer.getCategoryById(a.category_Id).subscribe((n) => {
          this.product = Object.assign(this.product, {
            CategoryName: n.name,
        });
        });
      }
      if (a.vendor_Id != null) {
        this.vendorSer.getVendorById(a.vendor_Id).subscribe((n) => {
          this.product = Object.assign(this.product, {
            VendorName: n.name,
        });
        });
      }

console.log(a);
    })
  }
  stepUp(){
    this.newQuantity+=1;
  }
  stepDown(){
    if(this.newQuantity!=1)
    this.newQuantity-=1;
  }
  AddToCart(){
    if (this.userId!=null){
      //add component to cart then display it
      this.AddToCartOrUpdateQuantity(new Cart(this.userId,this.id,this.newQuantity))
    }
    else {
      this.router.navigate(['/login/'])

    }

  }
  AddToCartOrUpdateQuantity(cart: Cart){
    this.cartSer.getCustomerProductsInCart(cart.user_Id).subscribe(a=>{
     if( this.checkIfExist(a,cart)){
      console.log("Exist")
       this.cartSer.UpdateProductInCart(cart).subscribe(a=>{
        console.log("Quantity Updated");
        this.modalService.open(CartComponent,   { size: 'lg' });
      // const modalRef = this.modalService.open(CartComponent);

       })
       }
       else {
      console.log("Not Exist")

       this.cartSer.AddProductToCart(cart).subscribe(a=>{
        console.log(a);
        this.modalService.open(CartComponent,   { size: 'lg' });
      // const modalRef = this.modalService.open(CartComponent);
       })
       }
    })
      }
      checkIfExist(a:Cart[],cart:Cart){
        for (let i = 0; i < a.length; i++) {
  if(a[i].product_Id==cart.product_Id){
    return true;
  }
        }
        return false;

      }

}
