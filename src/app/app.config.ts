import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { TranslationService } from './core/services/translation.service';
import { TRANSLATION_SERVICE } from './core/interfaces/translation.interface';
import { provideAnimations } from '@angular/platform-browser/animations';
import { TERMINAL_ERROR } from './terminal/interfaces/terminal-error.interface';
import { TerminalErrorService } from './terminal/services/terminal-error.service';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    {
      provide: TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: [HttpClient],
    },
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }).providers!,
    {
      provide: TRANSLATION_SERVICE,
      useClass: TranslationService,
    },
    { provide: TERMINAL_ERROR, useClass: TerminalErrorService },
  ],
};
