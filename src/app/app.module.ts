import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Ng5SliderModule } from 'ng5-slider';


import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SearchComponent } from './components/search/search.component';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './components/product/product.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { FilterComponent } from './components/filter/filter.component';

import { productReducer } from '../store/reducer/product.reducer';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { CartComponent } from './components/cart/cart.component';
import { FilterSortComponent } from './components/filter-sort/filter-sort.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ShoppingListComponent,
    FilterComponent,
    SearchComponent,
    HeaderComponent,
    CartComponent,
    FilterSortComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    StoreModule.forRoot({
      productsStore: productReducer
    }),
    Ng5SliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
