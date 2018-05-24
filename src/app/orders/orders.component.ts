import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})


export class OrdersComponent implements OnInit {
allOrders = [];
data: any [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.allOrders = [];
    this.http.get('http://localhost:58835/api/orders/getorders').subscribe(
      (data: any[]) => { this.data = data ; this.allOrders = this.data; console.log(this.data); } );



    }

}
