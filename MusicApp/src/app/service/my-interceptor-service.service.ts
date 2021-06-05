import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MyInterceptorServiceService implements HttpInterceptor
 {

  constructor() { }
  intercept(req: HttpRequest<any>,next: HttpHandler)
  {
    //var securityStr=sessionStorage.getItem('email')&& sessionStorage.getItem('token');
    if(sessionStorage.getItem('email')&& sessionStorage.getItem('token'))
    {
      req =req.clone({
        setHeaders:{
          Authorization:sessionStorage.getItem('token')
        }
      });
    }
    return next.handle(req);
  }
}
