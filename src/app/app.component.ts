import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { createClient } from 'contentful';
import { ContentfulService } from './shared/services/contentful.service';

const contentfulDeliveryClient = createClient({
  space: 'hsn03ejlp1oa',
  environment: 'master', // defaults to 'master' if not set
  accessToken: 'B7YObPRV7PWImLiSktwnYQBDObBLuPkcI9IoqgPLiug',
});


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'mean-stack-poc-v1';

  constructor(private http: HttpClient, private cfService: ContentfulService) { }

  ngOnInit(): void {
    this.cfService.getCategories().subscribe(res => console.log(res));
    // contentfulDeliveryClient.getEntries({
    //   content_type: 'product',
    //   'fields.category.sys.contentType.sys.id': 'category',
    //   'fields.category.fields.fieldName': 'phones',
    //   // 'fields.categories.sys.id[in]': cateogoryId,
    // }).then(res => {
    //   console.log(res);

    // })



    // this.http.get('/api').subscribe(res => console.log(res));
  }
}
