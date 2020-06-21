import { Component, OnInit } from '@angular/core';
import { ContentfulService } from 'src/app/shared/services/contentful.service';
import { Observable } from 'rxjs';
import { Category } from 'src/app/shared/interfaces/contentful';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  categories$: Observable<Category[]>;

  constructor(public authService: AuthService, private cfService: ContentfulService) { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories(): void {
    this.categories$ = this.cfService.getCategories();
  }

}
