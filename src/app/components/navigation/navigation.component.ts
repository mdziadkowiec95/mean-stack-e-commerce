import { Component, OnInit } from '@angular/core';
import { ContentfulService } from 'src/app/shared/services/contentful.service';
import { Observable } from 'rxjs';
import { Category } from 'src/app/shared/interfaces/contentful';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  categories$: Observable<Category[]>;

  constructor(private cfService: ContentfulService) { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories(): void {
    this.categories$ = this.cfService.getCategories();
  }

}
