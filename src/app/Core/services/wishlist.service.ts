import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private _HttpClient=inject(HttpClient)

  addProductToWishList(id:string|null):Observable<any>{
   return this._HttpClient.post(`${environment.BaseUrl}/api/v1/wishlist`,{productId:id})
  }
  RemoveProductFromWishList(id:string|null):Observable<any>{
   return this._HttpClient.delete(`${environment.BaseUrl}/api/v1/wishlist/${id}`)
  }
  GetProductfromWishList():Observable<any>{
   return this._HttpClient.get(`${environment.BaseUrl}/api/v1/wishlist`)
  }
  // constructor() { }
}
