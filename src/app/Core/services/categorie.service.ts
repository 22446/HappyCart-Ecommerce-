import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {
  private readonly _HttpClient=inject(HttpClient)
  GetAllCategories():Observable<any>{
    return this._HttpClient.get(`${environment.BaseUrl}/api/v1/categories`)
  }
  GetSpecificCategory(id:string|null):Observable<any>{
    return this._HttpClient.get(`${environment.BaseUrl}/api/v1/categories/${id}`)
  }
}
