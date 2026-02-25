import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { tap } from 'rxjs';

export const loggingInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  console.log('HTTP Request: ', req);
  console.log('HTTP Reuqest Method: ', req.method)
  console.log('HTTP Request URL: ', req.urlWithParams);
  console.log('HTTP Request Headers: ', req.headers);

  if (req.body) {
    console.log('HTTP Request Body: ', req.body);
  }

  return next(req).pipe(tap({
    next: (event: HttpEvent<any>) => {
      console.log('HTTP Response: ', event);
    },
    error: (err) => {
      console.error('HTTP Error: ', err);
    }
  }));
};
