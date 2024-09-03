import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    DecodedUserData:any=null
    private _Router=inject(Router)
  
  private readonly _HttpClient=inject(HttpClient) 
  sendRegister(data:object):Observable<any>{
    return this._HttpClient.post(`${environment.BaseUrl}/api/v1/auth/signup`,data)
  }

  sendlogin(data:object):Observable<any>{
    return this._HttpClient.post(`${environment.BaseUrl}/api/v1/auth/signin`,data)
  }

  UserData():void{
    if(localStorage.getItem("userToken")!==null){
      this.DecodedUserData= jwtDecode(localStorage.getItem("userToken")!)
      console.log("user",this.DecodedUserData.id)
    }
  }
  LogOut():void{
    if(localStorage.getItem("userToken")!==null){
      localStorage.removeItem("userToken")
      this.DecodedUserData=null
      this._Router.navigate(["/login"])
    }

    
  }
  ForgetPassworkByEmail(data:string):Observable<any>{
    return this._HttpClient.post(`${environment.BaseUrl}/api/v1/auth/forgotPasswords`,data)
  }
  ResetByCode(data:string):Observable<any>{
    return this._HttpClient.post(`${environment.BaseUrl}/api/v1/auth/verifyResetCode`,data)
  }
  ResetPassord(data:string):Observable<any>{
    return this._HttpClient.put(`${environment.BaseUrl}/api/v1/auth/resetPassword`,data)
  }
}
