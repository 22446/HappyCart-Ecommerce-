import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CategorieService } from '../../Core/services/categorie.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ICategoryDetails } from '../../Core/Interfaces/icategory-details';
import { Subscription } from 'rxjs';
import { Iproducts } from '../../Core/Interfaces/iproducts';
import { ProductsService } from '../../Core/services/products.service';
import { CartService } from '../../Core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-categorie-detailes',
  standalone: true,
  imports: [RouterLink,TranslateModule],
  templateUrl: './categorie-detailes.component.html',
  styleUrl: './categorie-detailes.component.scss'
})
export class CategorieDetailesComponent implements OnInit , OnDestroy {


  private _CategorieService=inject(CategorieService)
  private _ActivatedRoute =inject(ActivatedRoute)
  private _CartService =inject(CartService)
  filteredProducts: Iproducts[] = [];

  private _ProductsService =inject(ProductsService)
  IsReander:boolean=false
  IsReanderPro:boolean=false
  private _ToastrService=inject(ToastrService)
  errorMessage:string=""
  CategoryDeailsData:ICategoryDetails={}as ICategoryDetails
  pRODUCTCategoryDeailsData:Iproducts[]=[]
  CategoryDetSub!:Subscription

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      
      next:(p)=>{
        this.IsReander=true
      let id= p.get("id");
    this.CategoryDetSub=this._CategorieService.GetSpecificCategory(id).subscribe({
        next:(res)=>{
          this.CategoryDeailsData=res.data
          console.log(res.data)
        }
      })
      }

    
    })
    this._ProductsService.GetProductData().subscribe({
      next:(res)=>{
        
        console.log(res.data)
        this.pRODUCTCategoryDeailsData=res.data
        this.IsReanderPro=true
        this.filteredProducts = this.pRODUCTCategoryDeailsData.filter(product => product.category._id === this.CategoryDeailsData._id);
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
    this.CategoryDetSub?.unsubscribe()
  }

}
