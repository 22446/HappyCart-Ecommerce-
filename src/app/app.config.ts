import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withHashLocation, withInMemoryScrolling, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClient, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import {  provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { loadingInterceptor } from './Core/interceptors/loading.interceptor';
import { errorInterceptor } from './Core/interceptors/error.interceptor';
import { headerInterceptor } from './Core/interceptors/header.interceptor';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes,withViewTransitions(),withHashLocation(),withInMemoryScrolling({ scrollPositionRestoration: 'top' })),provideAnimations(),provideToastr(),importProvidersFrom([NgxSpinnerModule, 
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ]), provideClientHydration(),provideHttpClient(withFetch(),withInterceptors([loadingInterceptor,headerInterceptor,errorInterceptor]))]
};
