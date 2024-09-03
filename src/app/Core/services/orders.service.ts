import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { AuthService } from './auth.service';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {


 private _HttpClient=inject(HttpClient)
 CheckOut(id:string|null,Details:object):Observable<any>{
  return this._HttpClient.post(`${environment.BaseUrl}/api/v1/orders/checkout-session/${id}?url=http://localhost:4200`,{shippingAddress:Details})
 }
 getAllUserOrders(id:string|null):Observable<any>{
  return this._HttpClient.get(`${environment.BaseUrl}/api/v1/orders/user/${id}`)
 }
 
}
