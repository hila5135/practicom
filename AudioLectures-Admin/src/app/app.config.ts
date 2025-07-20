import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { API_BASE_URL } from './api/api-client';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes),
     provideHttpClient(),
      provideAnimationsAsync(),
       provideAnimationsAsync(),
        provideAnimationsAsync(),
        { provide: API_BASE_URL, useValue: 'https://audiolecturesserver.onrender.com' }
      ]
};
