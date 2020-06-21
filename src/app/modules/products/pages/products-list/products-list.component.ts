import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ContentfulService } from 'src/app/shared/services/contentful.service';
import { map } from 'rxjs/operators';
import { ProductListItem } from '../../interfaces/product-list-item.interface';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  products: ProductListItem[];

  constructor(private route: ActivatedRoute, private cfService: ContentfulService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => this.getProducts(params));
  }

  getProducts(params: Params): void {
    this.cfService.getProducts(params.category).pipe(map(products => products.map(p => ({
      id: p.sys.id,
      slug: p.fields.slug,
      name: p.fields.productName,
      price: p.fields.price,
      image: p.fields.image[0]
    })))).subscribe((products: ProductListItem[]) => {
      this.products = products;
    });
  }
}
