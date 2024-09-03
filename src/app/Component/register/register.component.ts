import { Component, inject, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../Core/services/auth.service';
import { NgClass } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Subscription } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass,RouterLink,RouterLinkActive,TranslateModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnDestroy{

  private readonly _AuthService =inject(AuthService) 
  private _FormBuilder=inject(FormBuilder)
  private _Router=inject(Router)
  RegisterSub!:Subscription
  errMessage:string=""
  ShowPassword:boolean=false
  ShowPasswordRe:boolean=false
  isLoading:boolean=false
  
  
  register:FormGroup=this._FormBuilder.group({
    name:[null,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
    email:[null,[Validators.required,Validators.email]],
    password:[null,[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{6,}$/)]],
    rePassword:[null],
    phone:[null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]]
  },{validators:this.ConfirmationPas})


 ConfirmationPas(g:AbstractControl)
{
 if(g.get("password")?.value==g.get("rePassword")?.value)
{
  return null
}
 else{
  return {mismatch:true}
 }
}


RegisterSubmit():void{
  if(this.register.valid){
    this.isLoading=true
  this.RegisterSub=  this._AuthService.sendRegister(this.register.value).subscribe({
      next:(res)=>{
       
        
        this._Router.navigate(['/login'])
        this.isLoading=false
      },
      error:(err)=>{
        this.errMessage=err.error.message
      
        this.isLoading=false
      }
    })


}
}
ngOnDestroy(): void {
  this.RegisterSub?.unsubscribe()
}
}
