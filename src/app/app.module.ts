import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {FormsModule} from '@angular/forms' ;
import { AppComponent } from './app.component';
import { ItemComponent } from './item/item.component';

import { ApiService } from './api.service';
import { HttpClientModule } from '@angular/common/http';




@NgModule({
  declarations: [
    AppComponent,
    ItemComponent,

  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
