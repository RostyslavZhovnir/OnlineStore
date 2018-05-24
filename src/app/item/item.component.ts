import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { PayPalConfig, PayPalEnvironment, PayPalIntegrationType } from 'ngx-paypal';


@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  public payPalConfig?: PayPalConfig;
  _buyForm = true;
  _addItemForm = false;
  toggleButton = true;
  im1 = false;
  _purchaseAlert = false;
  shipingCost = 60;
  selectedItemSum: number;
  selectedItemPrice: any;
  selectItem = [];
  data: any [];
  body: any;
  items = [];
  newOrder = [];
  newItem = [];
 purshaseItem: any;
 showme: number;
 payPalButton: false;
 options = [
   {name : 'Ноутбуки для навчання (до 400$)' , value : 'laptopsforeducation'},
   {name : 'Ноутбуки для бізнессу (від 400$)' , value : 'laptopsforbussines'},
   {name : 'Ноутбуки Apple (MacBook, MacBook Air, MacBook Pro)' , value : 'laptopsapple'},
   {name : 'Планшети Apple' , value : 'ipad'},
   {name : 'Планшети Android' , value : 'androidtablets'},
   {name : 'Комп&apos;ютери Apple (iMac, iMac Pro, Mac Pro, Mac mini)' , value : 'computersapple'},
   {name : 'Професійні фотоапарати (DSLR)' , value : 'dslrcameras'},
   {name : 'Дрони' , value : 'drones'},


];



 showhide(index: number) {
this.showme = index;
}
onValidatePurchase (form) {
  this.newOrder = form.value;


  this.http.post('http://localhost:58835/api/orders/postorders', this.newOrder).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log('Error occured');
      });
      this._addItemForm = false;
      this._buyForm = true;
      this._purchaseAlert = true;
}


onBuyItem(name: string, price: number) {
  this._addItemForm = false;
  this._buyForm = !this._buyForm;
  this.selectItem = this.items.find(item => item.Title === name);
 this.selectedItemSum = price + this.shipingCost;
 this.initConfig();


  }
  onAdd() {
    this._addItemForm = true;
   // this._buyForm = true;
  }



  onAddItem(form) {
    this.newItem = form.value;
    console.log(this.newItem);
    this.http.post('http://localhost:58835/api/items/postitems', this.newItem).subscribe(
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




laptopsforeducation() {
  this.http.get('http://localhost:58835/api/items/getlaptopsforeducation').subscribe(
    (data: any[]) => { this.data = data ; this.items = this.data; } );
}

laptopsforbussines() {
  this.http.get('http://localhost:58835/api/items/getlaptopsforbussines').subscribe(
    (data: any[]) => { this.data = data ; this.items = this.data; } );
}

laptopsapple() {
  this.http.get('http://localhost:58835/api/items/getlaptopsapple').subscribe(
    (data: any[]) => { this.data = data ; this.items = this.data; } );
}

ipad() {
  this.http.get('http://localhost:58835/api/items/getipad').subscribe(
    (data: any[]) => { this.data = data ; this.items = this.data; } );
}

androidtablets() {
  this.http.get('http://localhost:58835/api/items/getandroidtablets').subscribe(
    (data: any[]) => { this.data = data ; this.items = this.data; } );
}

computersapple() {
  this.http.get('http://localhost:58835/api/items/getcomputersapple').subscribe(
    (data: any[]) => { this.data = data ; this.items = this.data; } );
}

dslrcameras() {
  this.http.get('http://localhost:58835/api/items/getdslrcameras').subscribe(
    (data: any[]) => { this.data = data ; this.items = this.data; } );
}

drones() {
  this.http.get('http://localhost:58835/api/items/getdrones').subscribe(
    (data: any[]) => { this.data = data ; this.items = this.data; } );
}












  constructor(private http: HttpClient) { }


  ngOnInit(): void {

  this.selectItem = [];
  this.http.get('http://localhost:58835/api/items/getitems').subscribe(
    (data: any[]) => { this.data = data ; this.items = this.data; console.log(this.data); } );



  }

  private initConfig(): void {

 console.log (this.selectedItemSum);
    this.payPalConfig = new PayPalConfig(PayPalIntegrationType.ClientSideREST, PayPalEnvironment.Sandbox, {
      commit: true,

      client: {
        sandbox: 'Af6-OWHBFmTtzlZWPZctfHXsgRp7zpXeRuvcTSZlvz2kGxKOUn4C9Pjj4lkwbsgpJxwP8U1ELEjOvpgA'
      },
      button: {
        label: 'checkout',
        size: 'large',
        shape: 'rect',
        color: 'gold',
      },

      onPaymentComplete: (data, actions) => {
        console.log('OnPaymentComplete');

      },
      onCancel: (data, actions) => {
        console.log('OnCancel');
      },
      onError: (err) => {
        console.log('OnError', err);
      },

      transactions: [{
        amount: {
          currency: 'USD',
          total: this.selectedItemSum

        }
      }],

    });
  }

}
