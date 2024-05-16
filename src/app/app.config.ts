import { ApplicationConfig } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { errorHandlingInterceptor } from './core/interceptors/error-handler/error-handler.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { provideToastr } from 'ngx-toastr';
import { loaderInterceptor } from './core/interceptors/loader-interceptor/loader-interceptor.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes,withViewTransitions()),
  provideHttpClient(
    withInterceptors([
    errorHandlingInterceptor,
    loaderInterceptor
  ])),
  provideAnimationsAsync(),
  provideToastr(),
  NgxSpinnerModule,
]
};