import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private _httpClient=inject(HttpClient)
  NumberOfItemsInCart:WritableSignal<number>=signal(0)
  AddProductToCart(id:string|null):Observable<any>{
    return this._httpClient.post(`${environment.BaseUrl}/api/v1/cart`,{productId:id})
  }
  GetProductFromCart():Observable<any>{
    return this._httpClient.get(`${environment.BaseUrl}/api/v1/cart`)
  }
  UpdateQuantityCart(id:string|null,countPram:number):Observable<any>{
    return this._httpClient.put(`${environment.BaseUrl}/api/v1/cart/${id}`,{count:countPram})
  }
  RemoveSpecificItemFromCart(id:string|null):Observable<any>{
    return this._httpClient.delete(`${environment.BaseUrl}/api/v1/cart/${id}`)
  }
  RemoveAllItemsFromCart():Observable<any>{
    return this._httpClient.delete(`${environment.BaseUrl}/api/v1/cart`)
  }
}
