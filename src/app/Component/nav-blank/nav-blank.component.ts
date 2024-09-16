import { Component, computed, inject, OnInit, Signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../Core/services/auth.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MyTranslateService } from '../../Core/services/my-translate.service';
import { CartService } from '../../Core/services/cart.service';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,TranslateModule],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.scss'
})
export class NavBlankComponent implements OnInit{
 
  public _AuthService=inject(AuthService)
  public _MyTranslateService=inject(MyTranslateService)
  public _TranslateService=inject(TranslateService)
  public _CartService=inject(CartService)
  NumberOfItemsInCartNav:Signal<number>=computed(()=>this._CartService.NumberOfItemsInCart())
  ngOnInit(): void {
    this._CartService.GetProductFromCart().subscribe({
      next:(res)=>{
        this._CartService.NumberOfItemsInCart.set(res.numOfCartItems);
      }
    })
  }
  
}
