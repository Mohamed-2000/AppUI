import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CustomFormsModule } from 'ng2-validation'



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,CommonModule,FormsModule,RouterModule,HttpClientModule,ReactiveFormsModule,CustomFormsModule
  ],
  exports:[LoginComponent,RegisterComponent

  ]
})
export class AccountModule { }
