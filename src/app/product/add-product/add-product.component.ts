import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/_models/category';
import { Product } from 'src/app/_models/product';
import { Vendor } from 'src/app/_models/vendor';
import { CategoryService } from 'src/app/_services/category.service';
import { ProductService } from 'src/app/_services/product.service';
import { VendorService } from 'src/app/_services/vendor.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  // public id: number,
  // public category_Id:number,
  // public vendor_Id:number,
  // public en_Name:string,
  // public ar_Name: string,
  // public price: number,
  // public quantity: number,
  // public description: string,
  // public image: string | null,

  newProduct:Product=new Product(0,0,0,"","",1,1,"",null);
  vendors:Vendor[]=[];
  categories:Category[]=[];
  Parentcategories:Category[]=[];
  ChildCategories:Category[]=[];
  filteredCategories:Category[]=[];
  haveChiled:boolean=false;
  Valid:boolean=true;
  selectedImage=true;
  Selected=false;


  Image: File | null = null;
  imageurl = "http://ssl.gstatic.com/accounts/ui/avatar_2x.png";
  constructor(public router:Router,public vendorSer:VendorService,public catSer:CategoryService,public productSer:ProductService) { }

  ngOnInit(): void {
    this.getAllVendors();
    this.getAllCategories();
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
  SelectedVendor(event: any){
    this.newProduct.vendor_Id=this.vendors[event.target.value].id;
  }
  SelectedCategory(event: any) {
    this.newProduct.category_Id = this.filteredCategories[event.target.value].id
    console.log(this.newProduct);
  }
// getAllProducts(){
//   this.productSer.getAllProducts().subscribe()
// }
  OnSubmit(contactForm:any) {
    if (contactForm.valid )
    {
      this.Valid=true;
      this.selectedImage=true;


    console.log(contactForm.value);
    this.productSer.createProduct(this.newProduct).subscribe((a) => {
      // this.ngOnInit();
      console.log(a);
      let fd = new FormData();
      if (this.Image) {
        fd.append("files", this.Image, this.Image.name);
        console.log(this.Image.name);
this.productSer.addImage(a.id,fd).subscribe(n=>{
  this.newProduct.image = n.image;
  this.router.navigate(['/Inventory/'])

})
    }
    else

  this.router.navigate(['/Inventory/'])


    })}
else{
  this.Valid=false;
  this.selectedImage=false;
}
  }
    AddImg(I: any) {
      this.Selected=true;
      if (I.target.value) {
        this.Image = <File>I.target.files[0];
console.log(this.Image)
        const reader = new FileReader();
        reader.readAsDataURL(this.Image);
        reader.onload = (_event) => {
          this.imageurl = reader.result?.toString() ? reader.result.toString() : this.imageurl;
console.log(this.imageurl)

        }
      }
    }

}
