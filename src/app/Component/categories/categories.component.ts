import { RouterLink } from '@angular/router';
import { ICategory } from '../../Core/Interfaces/icategory';
import { CategorieService } from './../../Core/services/categorie.service';
import { Component, inject, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [RouterLink ,TranslateModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
  private _CategorieService =inject(CategorieService)
   CategoryDataAll:ICategory[]=[];
  isReander:boolean=false
  ngOnInit(): void {
    this._CategorieService.GetAllCategories().subscribe({
      next:(res)=>{
        this.isReander=true
        console.log(res.data);
        this.CategoryDataAll=res.data;
      }
    })
  }


}
