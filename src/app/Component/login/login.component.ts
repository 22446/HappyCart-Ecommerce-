import { Component, inject, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../Core/services/auth.service';
import { NgClass } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Subscription } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass,RouterLink,RouterLinkActive,TranslateModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnDestroy {

  private readonly _AuthService =inject(AuthService) 
  private _FormBuilder=inject(FormBuilder)
  private _Router=inject(Router)
  LoginSub!:Subscription
  errMessage:string=""
  ShowPassword:boolean=false
  isLoading:boolean=false
  
  login:FormGroup=this._FormBuilder.group({
   
    email:['Mazin.safwat3452@gmail.com',[Validators.required,Validators.email]],
    password:['Mazinsaf',[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{6,}$/)]],
  
  })


loginSubmit():void{
  if(this.login.valid){
    this.isLoading=true
   this.LoginSub= this._AuthService.sendlogin(this.login.value).subscribe({
      next:(res)=>{
        
        localStorage.setItem("userToken",res.token)
        this._AuthService.UserData()
        this._Router.navigate(['/home'])
        this.isLoading=false
      },
      error:(err)=>{
        this.errMessage=err.error.message
       
        this.isLoading=false
      }
    })

console.log(this.login)
}
}
ngOnDestroy(): void {
this.LoginSub?.unsubscribe()
}

}
