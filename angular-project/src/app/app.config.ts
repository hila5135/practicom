import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { API_BASE_URL } from './api/api-client' // עדכני לפי הנתיב האמיתי
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { environment } from '../../environment';
export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
  provideRouter(routes),
  provideHttpClient(),
{provide : API_BASE_URL , useValue: environment.apiUrl}],
};
