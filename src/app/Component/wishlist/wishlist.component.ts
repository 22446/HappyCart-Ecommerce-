import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { WishlistService } from '../../Core/services/wishlist.service';
import { WishList } from '../../Core/Interfaces/wish-list';
import { RouterLink } from '@angular/router';
import { CartService } from '../../Core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [RouterLink,TranslateModule,NgClass],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent {

 private _WishlistService = inject(WishlistService)
 private _CartService = inject(CartService)
 isAdd:boolean=false
 private _ToastrService = inject(ToastrService)
 isrenser:boolean=false

 WishlistData:WishList[]=[]
  ngOnInit(): void {
   this.getAllproduct()
    
  }
  getAllproduct(){
    this._WishlistService.GetProductfromWishList().subscribe({
      next:(res)=>{
        console.log(res.data)
        this.WishlistData=res.data
        
      }
    })
  }
  RemoveFromWishList(id:string|null){
    this._WishlistService.RemoveProductFromWishList(id).subscribe({
      next:(res)=>{
        if(res.status=="success"){
          this.getAllproduct()
        this._ToastrService.success(res.message)
        }
        console.log(res)
        
      },error:(err)=>{
        console.log(err.error.message)
      }
    })
  }
  AddToCartFunc(id:string|null){
    this._CartService.AddProductToCart(id).subscribe({
      
      next:(res)=>{
        this.isAdd=true
        console.log(res)
        this._CartService.NumberOfItemsInCart.set(res.numOfCartItems);
        this._ToastrService.success(res.message)
      }
    })
  }

  }

