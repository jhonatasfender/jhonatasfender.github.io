import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { TRANSLATION_SERVICE } from './app/core/interfaces/translation.interface';

bootstrapApplication(AppComponent, appConfig).then(appRef => {
  const translationService = appRef.injector.get(TRANSLATION_SERVICE);
  translationService.setDefaultLang('en');
  translationService.use('en').subscribe({
    next: () => {},
    error: () => {}
  });
}).catch((err) => {
  console.error('Error bootstrapping application:', err);
});
