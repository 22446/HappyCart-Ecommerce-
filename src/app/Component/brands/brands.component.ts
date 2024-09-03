import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { BrandsService } from '../../Core/services/brands.service';
import { IBrand } from '../../Core/Interfaces/ibrand';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [RouterLink,TranslateModule],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit,OnDestroy {

  
  private _BrandsService= inject(BrandsService)
   BrandsAllDara:IBrand[]=[]
   isRender:boolean=false
   BrandSub!:Subscription
  
  ngOnInit(): void {
   this.BrandSub= this._BrandsService.GetAllBrands().subscribe({
      next:(res)=>{
        this.isRender=true
        console.log(res.data)
        this.BrandsAllDara=res.data
      }
    })
  }
  ngOnDestroy(): void {
    this.BrandSub?.unsubscribe()
  }
}
