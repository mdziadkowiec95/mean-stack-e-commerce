import { Injectable } from '@angular/core';
import { createClient } from 'contentful';
import { environment } from 'src/environments/environment';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EntriesResponse, Category } from '../interfaces/contentful';

const CONTENTFUL_CONFIG = {
  space: environment.CF_SPACE_ID,
  environment: 'master', // defaults to 'master' if not set
  accessToken: environment.CF_DELIVERY_ACCESS_TOKEN
};

@Injectable()
export class ContentfulService {
  cfClient: any;

  constructor() {
    this.cfClient = createClient(CONTENTFUL_CONFIG);
  }

  getCategories(): Observable<Category[]> {
    const promise: Promise<EntriesResponse<Category>> = this.cfClient.getEntries({
      content_type: 'category'
    });

    return from(promise).pipe(map(response => response.items));
  }

  getProducts(category: string): Observable<any> {
    const promise: Promise<any> = this.cfClient.getEntries({
      content_type: 'product',
      'fields.category.sys.contentType.sys.id': 'category',
      'fields.category.fields.fieldName': category,
    });

    return from(promise).pipe(map(response => response.items));
  }
}
