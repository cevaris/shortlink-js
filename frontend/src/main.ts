import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

console.log('mode: ', environment.production);

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
