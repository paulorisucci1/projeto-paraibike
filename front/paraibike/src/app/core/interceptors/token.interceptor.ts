import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AlertaService } from 'src/app/service/alerta.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private router: Router, private alertaService: AlertaService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let token = localStorage.getItem('token');

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: token,
        },
      });
    }

    return next.handle(request).pipe(
      catchError((error: any) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          // Redirecionar para a página de login
          this.router.navigate(['/login']);

          // Exibir mensagem de erro
          this.alertaService.alertaErro('Dados incorretos! Tente novamente.');
        }
        return throwError(error);
      })
    );;
  }

}
