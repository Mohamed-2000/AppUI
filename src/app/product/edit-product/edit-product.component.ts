import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/_models/category';
import { Product } from 'src/app/_models/product';
import { Vendor } from 'src/app/_models/vendor';
import { CategoryService } from 'src/app/_services/category.service';
import { ProductService } from 'src/app/_services/product.service';
import { VendorService } from 'src/app/_services/vendor.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  productId:number=0;
  product:Product|any;
  vendors:Vendor[]=[];
  categories:Category[]=[];
  Parentcategories:Category[]=[];
  ChildCategories:Category[]=[];
  filteredCategories:Category[]=[];
  constructor(public router: Router ,public ar:ActivatedRoute,public prodSer:ProductService,
    public catSer:CategoryService,public vendorSer:VendorService) { }

  ngOnInit(): void {
    this.productId = this.ar.snapshot.params['id'];
this.prodSer.getProductById(this.productId).subscribe(a=>{
  if (a!=null) this.product=a;
})
this.getAllVendors();
this.getAllCategories();

  }
  OnSubmit(contactForm:any) {
    if (contactForm.valid )
    {


    console.log(contactForm.value);
    this.prodSer.updateProduct(this.product).subscribe((a) => {
      // this.ngOnInit();
      console.log(a);
  this.router.navigate(['/Inventory/'])
      }  )}
  }
  SelectedVendor(event: any){
    this.product.vendor_Id=this.vendors[event.target.value].id;
  }
  SelectedCategory(event: any) {
    this.product.category_Id = this.filteredCategories[event.target.value].id
    console.log(this.product);
  }
  getAllVendors(){
    this.vendorSer.getAllVendors().subscribe(a=>{
      console.log(a);
      this.vendors=a;
    })
  }
  getAllCategories(){
    this.catSer.getAllCategories().subscribe(a=>{
      console.log(a);
      this.categories=a;
      a.forEach(element => {
        if(element.parent_Category_Id==null) //parent
        {
this.Parentcategories.push(element);

        }
      }
      );
     console.log(this.Parentcategories)
     this.ChildCategories=this.categories.filter(x => !this.Parentcategories.includes(x)) ;
     console.log(this.ChildCategories);
this.Parentcategories.forEach(P => {
  this.ChildCategories.forEach(C => {
    if(P.id==C.parent_Category_Id)
    {
      const index = this.Parentcategories.indexOf(P);
      if (index > -1) {
        this.Parentcategories.splice(index, 1);
      }

    }
  });

});
console.log(this.Parentcategories)
this.filteredCategories=this.Parentcategories.concat(this.ChildCategories);
console.log(this.filteredCategories)

// console.log(this.Parentcategories.filter(x => !this.ChildCategories.includes(x)));



    })
  }
}
