import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../Core/services/products.service';
import { IDetails } from '../../Core/Interfaces/idetails';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Subscription } from 'rxjs';
import { CartService } from '../../Core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CarouselModule,TranslateModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit ,OnDestroy{
  DetailsData:IDetails={} as IDetails
  isrender:boolean=false
  DetailsSub!:Subscription
  _ToastrService =inject(ToastrService)
  private _ActivatedRoute =inject(ActivatedRoute)
  private _CartService =inject(CartService)
  private _ProductsService=inject(ProductsService)
  
  StaticDetOptionsCat: OwlOptions = {
    loop: true,
    pullDrag: true,
    dots: false,
    autoplay:true,
    rtl:true,
    autoplayHoverPause:true,
    autoplaySpeed:500,
    mouseDrag:true,
    touchDrag:true,
    navSpeed: 700,
    navText: ['', ''],
    items:1,
    nav: true
  }


 ngOnInit(): void {
  this.DetailsSub= this._ActivatedRoute.paramMap.subscribe({
    next:(p)=>{
      let id = p.get("id")
      this._ProductsService.GetSpecificProduct(id).subscribe({
        next:(res)=>{
          this.isrender=true
          this.DetailsData=res.data
          console.log(res.data)
        }
      })
    }
   })
}
AddToCartFunc(id:string|null){
  this._CartService.AddProductToCart(id).subscribe({
    next:(res)=>{
      console.log(res)
      this._CartService.NumberOfItemsInCart.set(res.numOfCartItems)
        this._ToastrService.success(res.message)
    }
  })
}

  ngOnDestroy(): void {
    this.DetailsSub?.unsubscribe();
  }
 
}
