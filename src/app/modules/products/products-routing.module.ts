import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsListComponent } from './pages/products-list/products-list.component';

const routes: Routes = [
    { path: '', component: ProductsListComponent },
    { path: ':category', component: ProductsListComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductsRoutingModule { }