import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ContentfulService } from 'src/app/shared/services/contentful.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  products: any[];

  constructor(private route: ActivatedRoute, private cfService: ContentfulService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => this.getProducts(params));
  }

  getProducts(params: Params): void {
    this.cfService.getProducts(params.category).subscribe(products => {
      console.log(products);

      this.products = products;
    });
  }
}
