import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/_models/category';
import { CategoryService } from 'src/app/_services/category.service';
import { MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit,OnChanges {
  @ViewChild(MatPaginator) paginator:MatPaginator|any;
  @ViewChild(MatSort) sort:MatSort|any;
categories:Category[]=[];
parentCategoriesNames:string[]=[];
p: number = 1;
displayedColumns: string[] = ['Count','name','parent','description','action'];
datasource:any;
  constructor(public catSer:CategoryService, public router:Router) { }
  ngOnChanges(changes: SimpleChanges): void {
    this.UpdateList();
    }

  ngOnInit(): void {
      this.UpdateList();

    }
    Delete(id:number){
      if(confirm("Are you sure to delete ?")) {
        this.catSer.deleteCategory(id).subscribe(a=>{
          console.log(a);
          this.UpdateList();
        })
         }

    }
UpdateList(){
  this.catSer.getAllCategories().subscribe(a=>{
    this.categories=a
    this.datasource= new MatTableDataSource(this.categories);
  this.datasource.paginator=this.paginator;
  this.datasource.sort=this.sort;
    this.parentCategoriesNames=[];
    console.log(this.categories);

    this.categories.forEach((element, index) => {
    if (element.parent_Category_Id!=null){
      console.log(element.parent_Category_Id);
this.catSer.getCategoryById(element.parent_Category_Id).subscribe(n=>{
  this.categories[index] = Object.assign(this.categories[index], {
    ParentName: n.name,
});

  this.parentCategoriesNames[index]=n.name;
})

    }



  });
  console.log(this.parentCategoriesNames);

  })
}

  }


