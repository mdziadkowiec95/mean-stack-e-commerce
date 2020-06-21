import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './pages/cart/cart.component';
import { CartRoutingModule } from './cart-routing.module';
import { CartProductListComponent } from './components/cart-product-list/cart-product-list.component';



@NgModule({
  declarations: [CartComponent, CartProductListComponent],
  imports: [
    CommonModule,
    CartRoutingModule
  ]
})
export class CartModule { }
