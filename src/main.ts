// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {  routes } from './app/app.routes';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { appConfig } from './app/app.config';
import { provideRouter } from '@angular/router';

bootstrapApplication(AppComponent, {
  providers: [
        provideToastr({      // ✅ correct way for standalone API
      positionClass: 'toast-top-center',
    }),
     provideAnimations(), 
    provideHttpClient(withFetch()),
    importProvidersFrom(FormsModule),
    // appRouter, // ✅ make sure router is provided
      provideRouter(routes),
  ]
}).catch(err => console.error(err));
