import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentfulService } from './services/contentful.service';



@NgModule({
  declarations: [],
  providers: [ContentfulService],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
