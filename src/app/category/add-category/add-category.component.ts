import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/_models/category';
import { CategoryService } from 'src/app/_services/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  categories:Category[]=[];
  isVisible: any;

  isChecked:boolean=false;
newCategory:Category=new Category(0,null,"","");
  constructor(public catSer:CategoryService,public router:Router) { }

  ngOnInit(): void {
    this.getAllCategories();
  }
  SelectedCategory(event: any) {
    this.newCategory.parent_Category_Id = this.categories[event.target.value].id
    console.log(this.newCategory);
  }
  getAllCategories(){
    this.catSer.getAllCategories().subscribe(a=>{
      this.categories=a;
      console.log(this.categories);

    })
  }
    OnSubmit(contactForm:any) {
    this.catSer.createCategory(this.newCategory).subscribe((a) => {
      console.log(a);
      this.getAllCategories();
            this.router.navigate(['/categories/'])
    }
    )
    };




  }

