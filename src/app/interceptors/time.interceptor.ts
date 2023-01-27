import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpContext,
  HttpContextToken,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

const Check_Time= new HttpContextToken<boolean>(()=>false);
export function checkTime(){
  return new HttpContext().set(Check_Time, true)
}
@Injectable()
export class TimeInterceptor implements HttpInterceptor {

  constructor() {}

//interceptar peticiones
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.context.get(Check_Time)){
      const start = performance.now();
      return next.handle(request).pipe(
        tap(()=>{
          const time = (performance.now()-start)+'ms';
          console.log(request.url, time);

        })
      );
    }
    return next.handle(request);
  }
}
