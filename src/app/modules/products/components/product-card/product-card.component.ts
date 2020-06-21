import { Component, OnInit, Input } from '@angular/core';
import { ProductListItem } from '../../interfaces/product-list-item.interface';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input() product: ProductListItem;

  constructor(public cartService: CartService) { }

  ngOnInit() {

  }

  onAddToCart(product: ProductListItem): void {
    this.cartService.addToCart(product);
  }

}
