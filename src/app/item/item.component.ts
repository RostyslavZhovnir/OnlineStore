import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

interface ItemsList {
  id: number ;
  Title: string;
  Description: string;
  Price: number;
  Source: string;


}
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  _buyForm = true;
  _addItemForm = false;
  toggleButton = true;
  shipingCost = 60;
  selectItem = [];
  data: any [];
  body: any;
  items = [];
  newOrder = [];
  newItem = [];

onValidatePurchase (form) {
  console.log(form);
  // this.body = 'firstname=' + form.fName + '&lastname=' + form.lName  + '&name=' + form.phone;
//  this.http.post('http://localhost:58485/api/items', form).subscribe((data) => {});
}
onBuyItem(name: string) {
  this._addItemForm = false;
  this._buyForm = !this._buyForm;
  this.selectItem = this.items.find(item => item.Title === name);
  console.log(this.selectItem);
  }
  onAdd() {
    this._addItemForm = true;
   // this._buyForm = true;
  }

  onAddItem(form) {
    this.newItem = form.value;
    this.http.post('http://localhost:58485/api/items', this.newItem).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log('Error occured');
      });
      this._addItemForm = false;
     // this._buyForm = false;
      }


onCancelPurchase() {
  console.log('Purchase canceled');
  this._buyForm = !this._buyForm;

}

  constructor(private http: HttpClient) { }


  ngOnInit(): void {
  this.selectItem = [];
  this.http.get('http://localhost:58485/api/items').subscribe(
    (data: any[]) => { this.data = data ; this.items = this.data; } );



  }

}
