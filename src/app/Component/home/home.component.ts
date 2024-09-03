import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../Core/services/products.service';
import { Iproducts } from '../../Core/Interfaces/iproducts';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CategorieService } from '../../Core/services/categorie.service';
import { ICategory } from '../../Core/Interfaces/icategory';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from '../../Core/services/cart.service';
import { SearchPipe } from '../../Core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TranslateModule } from '@ngx-translate/core';
import { WishlistService } from '../../Core/services/wishlist.service';
import { WishList } from '../../Core/Interfaces/wish-list';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule,RouterLink,FormsModule,SearchPipe,TranslateModule,NgClass],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit,OnDestroy {
  isRender:boolean=false
  ProductsData:Iproducts[]=[]
  ProductsData2:Iproducts[]=[]
  CategoriesData:ICategory[]=[]
  WishListId:string[]=[]
  isAdd:boolean=false
  text:string=""
  private _ProductsService=inject(ProductsService)
  private _CartService=inject(CartService)
  private _CategorieService=inject(CategorieService)
  private _WishlistService=inject(WishlistService)
  private _ToastrService=inject(ToastrService)
  wishlist: { [id: string]: boolean } = {};
  HomeSub!:Subscription
  
  customOptionsCat: OwlOptions = {
    loop: true,
    pullDrag: true,
    dots: false,
    autoplay:true,
    autoplayHoverPause:true,
    autoplaySpeed:500,
    mouseDrag:true,
    rtl:true,

    touchDrag:true,
    navSpeed: 700,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 1
      },
      500: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }

  StaticOptionsCat: OwlOptions = {
    loop: true,
    pullDrag: true,
    dots: false,
    autoplay:true,
    autoplayHoverPause:true,
    rtl:true,
    autoplaySpeed:500,
    mouseDrag:true,
    touchDrag:true,
    autoWidth:true,
    navSpeed: 700,
    navText: ['', ''],
    items:1,
    nav: true
  }

  ngOnInit(): void {
    
   this.HomeSub= this._CategorieService.GetAllCategories().subscribe({
      next:(res)=>{
       
        this.CategoriesData=res.data
        console.log("cat",res.data)
      }
    })


    this.HomeSub=this._ProductsService.GetProductData().subscribe({
      next:(res)=>{
        this.ProductsData=res.data
        console.log(res.data)
        this.isRender=true
      },
      error:(err)=>{
        console.log(err.error.meesage)
      }
    })
    this._WishlistService.GetProductfromWishList().subscribe({
      next: (res) => {
        this.ProductsData2 = res.data
        for (const item of this.ProductsData2) {
          this.WishListId.push(item._id)
          
        }

      },


      error: (err) => {
        console.log(err);
      }
    })
  }
  
  AddToCartFunc(id:string|null){
    this._CartService.AddProductToCart(id).subscribe({
      next:(res)=>{
        console.log(res)
        this._CartService.NumberOfItemsInCart.set(res.numOfCartItems);
        this._ToastrService.success(res.message)

        
      }
    })
  }
  AddToWishList(id:string|null){
    if(this.WishListId.includes(id!)){
      this._WishlistService.RemoveProductFromWishList(id).subscribe({
        next:(res)=>{
          this.WishListId=res.data
          console.log(res)
          this._ToastrService.info("Product removed successfully from your wishlist")
        }
      })

    }else{
      this._WishlistService.addProductToWishList(id).subscribe({
        next:(res)=>{
            this.WishListId=res.data
          this._ToastrService.success(res.message)

        }
      })
    }
  }
  ngOnDestroy(): void {
    this.HomeSub?.unsubscribe();
  }
}
