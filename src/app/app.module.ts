import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {FormsModule} from '@angular/forms' ;
import { AppComponent } from './app.component';
import { ItemComponent } from './item/item.component';

import { ApiService } from './api.service';
import { HttpClientModule } from '@angular/common/http';
import { OrdersComponent } from './orders/orders.component';
import { RouterModule, Routes } from '@angular/router';
import { NgxPayPalModule } from 'ngx-paypal';

const appRoutes = [
  {path: 'orders', component : OrdersComponent},
  {path: '', component: ItemComponent },

];


@NgModule({
  declarations: [
    AppComponent,
    ItemComponent,
    OrdersComponent,


  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule, RouterModule.forRoot(appRoutes), NgxPayPalModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
