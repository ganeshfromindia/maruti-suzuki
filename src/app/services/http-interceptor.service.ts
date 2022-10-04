import { Injectable } from "@angular/core";
import { HttpInterceptor } from "@angular/common/http";
import { HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { HttpHandler } from "@angular/common/http";
import { HttpEvent } from "@angular/common/http";
import { HttpResponse } from "@angular/common/http";
import { Router } from "@angular/router";

import { map } from "rxjs/operators";
@Injectable({
  providedIn: "root",
})
export class HttpInterceptorService implements HttpInterceptor {
  token: string = "";
  omitCalls = ["authenticate", "googleapis", "otp"];
  skipInterceptor = false;
  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.skipInterceptor = false;

    this.omitCalls.forEach((api: string) => {
      if (req.url.includes(api)) {
        this.skipInterceptor = true;
      }
    });

    this.token = JSON.parse(sessionStorage.getItem("authToken") || "{}");

    if (this.token && !this.skipInterceptor) {
      const tokenizedReq: HttpRequest<any> = req.clone({
        headers: req.headers.set("Authorization", "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBYmhpamVldCIsImNyZWF0ZWQiOjE2NjQ4NTg5ODMyMzIsImlkIjozLCJ1c2VyVHlwZSI6IlNVUEVSX0FETUlOIiwidXNlck5hbWUiOiJBYmhpamVldCIsImV4cCI6MTY2NTQ2Mzc4M30.ZA8BkrhntOpm-JxWP9iA3Em0nPfE-HFj_5jWj2XAnUyw7_3SIL-2hSq69fQa0WrELMTJ-DcbdeT-rz8mgfLX-g"),
      });

      return next.handle(tokenizedReq).pipe(
        map((event: HttpEvent<any>): HttpEvent<any> => {
          if (event instanceof HttpResponse) {
            if (event.status === 401) {
              // this.facadeService.userLoggedOut();
              // this.router.navigateByUrl('core/login');
            }
          }
          return event;
        })
      );
    } else {
      // this.facadeService.userLoggedOut();
      // this.router.navigateByUrl('core/login');
    }
    return next.handle(req);
  }
}
