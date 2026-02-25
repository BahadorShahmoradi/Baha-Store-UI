import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { loggingInterceptor } from './app/interceptors/login/login.interceptor';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

bootstrapApplication(AppComponent, {
  providers: [
    providePrimeNG({
        theme:{
          preset:Aura
        }
    }),
    provideHttpClient(
      withInterceptors([loggingInterceptor])
    ),
    provideRouter(routes),
  ]
}).catch((err) => console.error(err));