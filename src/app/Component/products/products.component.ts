import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../Core/services/products.service';
import { Iproducts } from '../../Core/Interfaces/iproducts';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';
import { CartService } from '../../Core/services/cart.service';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink,TranslateModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit , OnDestroy {

  private _ProductsService= inject(ProductsService)
  private _CartService= inject(CartService)
  ProductSub!:Subscription
  private _ToastrService=inject(ToastrService)

  isRender:boolean=false
  ProductAllData:Iproducts[]=[]
  ngOnInit(): void {
   this.ProductSub= this._ProductsService.GetProductData().subscribe({
      next:(res)=>{
        this.isRender=true
        this.ProductAllData=res.data
      }
    })
  }
  AddToCartFunc(id:string|null){
    this._CartService.AddProductToCart(id).subscribe({
      next:(res)=>{
        this._CartService.NumberOfItemsInCart.set(res.numOfCartItems)
        this._ToastrService.success(res.message)

       
      }
    })
  }
  ngOnDestroy(): void {
    this.ProductSub?.unsubscribe()
  }


}
