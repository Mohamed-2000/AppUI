import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { ErrorComponent } from './shared/error/error.component';
import { HomeComponent } from './shared/home/home.component';
import { AdminGuard } from './_helpers/admin.guard';
import { AuthGuard } from './_helpers/auth.guard';

const routes: Routes = [
  { path: "", component: HomeComponent, pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },

  // ,canActivate: [AdminGuard]


  { path: "**", component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
