import { Icart } from './../../Core/Interfaces/icart';
import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../Core/services/cart.service';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe,RouterLink,TranslateModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  _CartServices=inject(CartService)
 private _ToastrService=inject(ToastrService)
 cartData:Icart={}as Icart


 ngOnInit(): void {
  this._CartServices.GetProductFromCart().subscribe({
    next:(res)=>{

     this.cartData=res.data
     console.log(res.data)
    }
  })
 }
 CountSubmit(id:string|null,count:number):void{
  this._CartServices.UpdateQuantityCart(id,count).subscribe({
    next:(res)=>{
      this.cartData=res.data
    }
  })
 }
 DeleteSpecificItem(id:string|null){
  this._CartServices.RemoveSpecificItemFromCart(id).subscribe({
    next:(res)=>{
      console.log(res)
      this.cartData=res.data
      this._CartServices.NumberOfItemsInCart.set(res.numOfCartItems)
      this._ToastrService.success("Item Deleted Succesfuly")

    }
  })
 }
 DeleteAllItems(){
  this._CartServices.RemoveAllItemsFromCart().subscribe({
    next:(res)=>{
      
      this.cartData=res.data
      console.log(res)
      this._CartServices.NumberOfItemsInCart.set(0)
      this._ToastrService.success("Items Deleted Succesfuly")

      
    }
  })
 }
 
}
