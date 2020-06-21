import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentfulService } from './services/contentful.service';
import { CartService } from './services/cart.service';
import { AuthService } from './services/auth.service';



@NgModule({
  declarations: [],
  providers: [ContentfulService, CartService, AuthService],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
