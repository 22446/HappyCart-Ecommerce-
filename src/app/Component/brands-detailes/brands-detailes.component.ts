import { Component, inject } from '@angular/core';
import { BrandsService } from '../../Core/services/brands.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Iproducts } from '../../Core/Interfaces/iproducts';
import { ProductsService } from '../../Core/services/products.service';
import { Subscription } from 'rxjs';
import { IBrand } from '../../Core/Interfaces/ibrand';
import { CartService } from '../../Core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-brands-detailes',
  standalone: true,
  imports: [RouterLink,TranslateModule],
  templateUrl: './brands-detailes.component.html',
  styleUrl: './brands-detailes.component.scss'
})
export class BrandsDetailesComponent {

  
  private _BrandsService=inject(BrandsService)
  private _ActivatedRoute =inject(ActivatedRoute)
  private _CartService =inject(CartService)

  filteredProducts: Iproducts[] = [];
  private _ProductsService =inject(ProductsService)
   _ToastrService =inject(ToastrService)
  IsReander:boolean=false
  IsReanderPro:boolean=false
  errorMessage:string=""
  pRODUCTBrandDeailsData:Iproducts[]=[]
  BrandDeailsData:IBrand={}as IBrand
  BrandDetSub!:Subscription

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      
      next:(p)=>{
        this.IsReander=true
      let id= p.get("id");
    this.BrandDetSub=this._BrandsService.GetBrandsSpecific(id).subscribe({
        next:(res)=>{
          this.BrandDeailsData=res.data
          console.log(res.data)
        }
      })
      }

    
    })
    this._ProductsService.GetProductData().subscribe({
      next:(res)=>{
        
        console.log(res.data)
        this.pRODUCTBrandDeailsData=res.data
        this.IsReanderPro=true
        this.filteredProducts = this.pRODUCTBrandDeailsData.filter(product => product.brand._id === this.BrandDeailsData._id);
      },
      error:(err)=>{
        this.errorMessage=err.error.message
        console.log(err)
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
    this.BrandDetSub?.unsubscribe()
  }

}
