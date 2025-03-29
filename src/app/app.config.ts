import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync as provideAnimationsAsync_alias } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),provideHttpClient(), provideAnimationsAsync_alias()]
};
function provideAnimationsAsync(): import("@angular/core").Provider | import("@angular/core").EnvironmentProviders {
  throw new Error('Function not implemented.');
}

