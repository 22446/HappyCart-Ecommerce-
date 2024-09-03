import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MyTranslateService } from '../../Core/services/my-translate.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-nav-auth',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,TranslateModule],
  templateUrl: './nav-auth.component.html',
  styleUrl: './nav-auth.component.scss'
})
export class NavAuthComponent {
  public _MyTranslateService=inject(MyTranslateService)
  public _TranslateService=inject(TranslateService)

}
