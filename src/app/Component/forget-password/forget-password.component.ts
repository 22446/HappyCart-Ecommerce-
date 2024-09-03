import { TranslateModule } from '@ngx-translate/core';
import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../Core/services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';
import { TmplAstRecursiveVisitor } from '@angular/compiler';
import { log } from 'console';
// email:[null,[Validators.required,Validators.email]],
// password:[null,[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{6,}$/)]],
@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass,TranslateModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {
  private _AuthService=inject(AuthService)
  private _FormBuilder=inject(FormBuilder)
  private _Router=inject(Router)
  isLoading1:boolean=false
  isLoading2:boolean=false
  isLoading3:boolean=false
  ShowPassword:boolean=false
  step:number=1

 
ForgetByEmailGroup:FormGroup=this._FormBuilder.group({
  email:[null,[Validators.required,Validators.email]],
})
ForgetByCodeGroup:FormGroup=this._FormBuilder.group({
  resetCode:[null,[Validators.required,Validators.pattern(/^[0-9]{0,6}$/)]],
})

ResetPasswordEmailGroup:FormGroup=this._FormBuilder.group({
  email:[null,[Validators.required,Validators.email]],
  newPassword:[null,[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{6,}$/)]],
})


 SubmitForEmail():void{
   this.isLoading1=true
   let emailValue=this.ForgetByEmailGroup.get("email")?.value;
   this.ResetPasswordEmailGroup.get("email")?.patchValue(emailValue)
 this._AuthService.ForgetPassworkByEmail(this.ForgetByEmailGroup.value).subscribe({
   next:(res)=>{
    this.step=1
    console.log(res)
    console.log(this.ForgetByEmailGroup)
    if(res.statusMsg="success"){
      this.step=2
    }

    this.isLoading1=false
  }

 })
 }
 SubmitForCode():void{
   this.isLoading2=true
  this._AuthService.ResetByCode(this.ForgetByCodeGroup.value).subscribe({
    next:(res)=>{

      this.step=2
      if(res.statusMsg="Success"){
        this.step=3
      }
    this.isLoading2=false
    }
  
   })
 }
 SubmitForResetPassword():void{
   this.isLoading3=true
  this._AuthService.ResetPassord(this.ResetPasswordEmailGroup.value).subscribe({
    next:(res)=>{
      this.step=3
      localStorage.setItem("userToken",res.token)
      this._AuthService.UserData()
      this._Router.navigate(["/home"])

      this.isLoading3=false
    }
  
   })
 }


}
