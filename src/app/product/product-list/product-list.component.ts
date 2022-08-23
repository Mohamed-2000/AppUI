import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/_models/product';
import { CategoryService } from 'src/app/_services/category.service';
import { ProductService } from 'src/app/_services/product.service';
import { VendorService } from 'src/app/_services/vendor.service';
import { MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator:MatPaginator|any;
  @ViewChild(MatSort) sort:MatSort|any;
  displayedColumns: string[] = ['Count','image','en','ar','category','vendor','quantity','price','action'];
datasource:any;

  constructor(
    public productSer: ProductService,
    public router: Router,
    public catSer: CategoryService,
    public vendorSer: VendorService
  ) {}
  ngOnInit(): void {
    this.UpdateList();
  }
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }


  products: Product[] = [];
  categoriesNames: string[] = [];
  vendorsNames: string[] = [];
p: number = 1;



  UpdateList() {
    this.productSer.getAllProducts().subscribe((a) => {
      this.products = a;
      this.datasource= new MatTableDataSource(this.products);
      this.datasource.paginator=this.paginator;
      this.datasource.sort=this.sort;
      console.log(this.products);

      a.forEach((element, index) => {
        if (element.category_Id != null) {
          this.catSer.getCategoryById(element.category_Id).subscribe((n) => {
            this.products[index] = Object.assign(this.products[index], {
            CategoryName: n.name,
          });
            this.categoriesNames[index] = n.name;
          });
        }
      });
      a.forEach((element, index) => {
        if (element.vendor_Id != null) {
          this.vendorSer.getVendorById(element.vendor_Id).subscribe((n) => {
            this.products[index] = Object.assign(this.products[index], {
              VendorName: n.name,
          });

            this.vendorsNames[index] = n.name;
          });
        }
      });
      console.log(this.categoriesNames);
      console.log(this.vendorsNames);
    });
  }
  Delete(id:number){
    if(confirm("Are you sure to delete ?")) {
      this.productSer.deleteProduct(id).subscribe(a=>{
        console.log(a);
        this.UpdateList();
      })
       }

  }
}
