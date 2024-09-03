import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class MyTranslateService {

  platId =inject(PLATFORM_ID)
  _TranslateService =inject(TranslateService)
  constructor() {
    
    if(isPlatformBrowser(this.platId)){ 
  
        this._TranslateService.setDefaultLang('en')

        if(localStorage.getItem('lang')!==null){
        
        const savedLang  = localStorage.getItem('lang'); 
        

        if(savedLang){
          this._TranslateService.use(  savedLang  );
        }
      }
        this.changeDirection()
   }
}
changeDirection(){
  if(localStorage.getItem('lang') === 'en'){
    window.document.dir = 'ltr';
}
else if (localStorage.getItem('lang') === 'ar') {

window.document.dir = 'rtl';

}
}
changeLang(lang : string) {
  if(isPlatformBrowser(this.platId)){
    localStorage.setItem('lang'  , lang);
  }

  this._TranslateService.use(lang);
  this.changeDirection();
}

}
