import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/_services/category.service';
import { Router } from '@angular/router';
import { Category } from 'src/app/_models/category';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
categories:Category[]=[];
parentCategoriesNames:string[]=[];
categoryId:number=0;
category:Category|any;

  constructor(public catSer:CategoryService,public router:Router ,public ar:ActivatedRoute) { }

  ngOnInit(): void {
    this.categoryId = this.ar.snapshot.params['id'];
    this.catSer.getCategoryById(this.categoryId).subscribe(a=>{
      this.category=a;
      console.log(a);
    })
    this.catSer.getAllCategories().subscribe(a=>{
      console.log(a)
      this.categories=a
    a.forEach((element, index) => {
      if (element.parent_Category_Id!=null){
        this.catSer.getCategoryById(element.parent_Category_Id).subscribe(n=>{
          this.parentCategoriesNames[index]=n.name;
                })
      }
    });

    })

  }
  SelectedCategory(event: any) {
    this.category.parent_Category_Id = this.categories[event.target.value].id
    console.log(this.category);
  }
  Update(contactForm:any){
    this.catSer.updateCategory(new Category(this.category.id,this.category.parent_Category_Id,this.category.name,this.category.description)).subscribe(a=>{
      console.log(a);
      this.router.navigate(['/categories/'])
    })

  }

}
