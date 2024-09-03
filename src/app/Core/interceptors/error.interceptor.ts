import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, tap, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const _ToastrService= inject(ToastrService)
  return next(req).pipe(catchError((err)=>{
    _ToastrService.error(err.error.message)
    return throwError(()=>err)
  }));
};