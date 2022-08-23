import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { AddCategoryComponent } from './category/add-category/add-category.component';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { EditCategoryComponent } from './category/edit-category/edit-category.component';
import { CartComponent } from './order/cart/cart.component';
import { CheckoutComponent } from './order/checkout/checkout.component';
import { OrdersComponent } from './order/orders/orders.component';
import { ProductDetailsComponent } from './order/product-details/product-details.component';
import { ProductlistComponent } from './order/productlist/productlist.component';
import { AddProductComponent } from './product/add-product/add-product.component';
import { EditProductComponent } from './product/edit-product/edit-product.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ErrorComponent } from './shared/error/error.component';
import { HomeComponent } from './shared/home/home.component';
import { AdminGuard } from './_helpers/admin.guard';
import { AuthGuard } from './_helpers/auth.guard';

const routes: Routes = [
  { path: "", component: HomeComponent, pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "categories", component: CategoryListComponent },
  { path: "categories/add", component: AddCategoryComponent },
  { path: "categories/edit/:id", component: EditCategoryComponent },
  { path: "Inventory", component: ProductListComponent},
  // ,canActivate: [AdminGuard]
  { path: "Inventory/add", component: AddProductComponent },
  { path: "Inventory/edit/:id", component: EditProductComponent },
  { path: "products", component: ProductlistComponent },
  { path: "products/details/:id", component: ProductDetailsComponent },
  { path: "orders", component: OrdersComponent },
  { path: "mycart", component: CartComponent },
  { path: "checkout", component: CheckoutComponent },
  { path: "**", component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
