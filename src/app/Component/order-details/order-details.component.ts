import { Component, inject, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from 'express';
import { OrdersService } from '../../Core/services/orders.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass,TranslateModule],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss'
})
export class OrderDetailsComponent implements OnInit {
  private _FormBuilder=inject(FormBuilder)

  private _ActivatedRoute=inject(ActivatedRoute)
 
  ShowPassword:boolean=false
  isLoading:boolean=false
  _OrdersService=inject(OrdersService)
  errMessage:boolean=false
  CARDid:string|null=""
  
  shippingAddress:FormGroup=this._FormBuilder.group({
    
    details:[null,[Validators.required]],
    phone:[null,[Validators.required]],
    city:[null,[Validators.required]],
  })
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(P)=>{
       this.CARDid=P.get("id")
      }
    })
  }
  placeOrder(){
    this._OrdersService.CheckOut(this.CARDid,this.shippingAddress.value).subscribe({
      next:(res)=>
      {
        if(res.status=="success"){
            window.open(res.session.url,"_self")
        }
      },error:(err)=>{
        console.log(err.error)
      }
    })
  }

}
