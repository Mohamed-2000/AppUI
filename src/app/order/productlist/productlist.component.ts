import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/_models/product';
import { CategoryService } from 'src/app/_services/category.service';
import { ProductService } from 'src/app/_services/product.service';
import { VendorService } from 'src/app/_services/vendor.service';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { AddProductComponent } from 'src/app/product/add-product/add-product.component';
import { CartComponent } from '../cart/cart.component';
import { AuthService } from 'src/app/_services/auth.service';
import { CartService } from 'src/app/_services/cart.service';
import { Cart } from 'src/app/_models/cart';
@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})

export class ProductlistComponent implements OnInit {
  products: Product[]|any = [];
  FilteredProducts: Product[]|any = [];
  SearchText:string="";
  userId:number=this.auth.getCurrentUser()?.Id;
  quantitySelected:number=1;

  constructor(public productSer: ProductService,
    public router: Router,
    public catSer: CategoryService,
    public vendorSer: VendorService,
    public modalService: NgbModal,
    public auth:AuthService,
    public cartSer:CartService
    ) { }

  ngOnInit(): void {
    this.UpdateList();
  }
  UpdateList() {
    this.productSer.getAllProducts().subscribe((a) => {
      this.products = a;
      this.FilteredProducts = a;

      console.log(this.products);

      a.forEach((element, index) => {
        if (element.category_Id != null) {
          this.catSer.getCategoryById(element.category_Id).subscribe((n) => {
            this.products[index] = Object.assign(this.products[index], {
              CategoryName: n.name,
          });
          });
        }
      });
      a.forEach((element, index) => {
        if (element.vendor_Id != null) {
          this.vendorSer.getVendorById(element.vendor_Id).subscribe((n) => {
            this.products[index] = Object.assign(this.products[index], {
              VendorName: n.name,
              newQuantity: 1
          });
          });
        }
      });
      console.log(this.products);
    });
  }
FilterProductsByName(){
  this.FilteredProducts=[];
  for (let i = 0; i < this.products.length; i++)
    {
      if(this.products[i].en_Name.toLowerCase().includes(this.SearchText.toLowerCase()))
      {
        this.FilteredProducts.push(this.products[i]);
      }
    }
  console.log(this.FilteredProducts)
}
AddToCart(ProductId:number,i:number) {
  console.log(this.FilteredProducts[i].newQuantity)
  if (this.userId!=null){
    //add component to cart then display it
    this.AddToCartOrUpdateQuantity(new Cart(this.userId,ProductId,this.FilteredProducts[i].newQuantity))
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

    const modalRef = this.modalService.open(CartComponent,   { size: 'lg' });

     })
     }
     else {
    console.log("Not Exist")

     this.cartSer.AddProductToCart(cart).subscribe(a=>{
      console.log(a);
    // const modalRef = this.modalService.open(CartComponent);
    const modalRef = this.modalService.open(CartComponent,   { size: 'lg' });


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

    stepUp(i:number){
      this.FilteredProducts[i].newQuantity+=1;
    }
    stepDown(i:number){
      if(this.FilteredProducts[i].newQuantity!=1)
      this.FilteredProducts[i].newQuantity-=1;

    }
}
