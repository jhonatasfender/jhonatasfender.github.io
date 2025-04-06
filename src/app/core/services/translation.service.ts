import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { ITranslationService } from '../interfaces/translation.interface';
import { map } from 'rxjs/operators';

type TranslationObject = {
  [key: string]: string | TranslationObject;
};

class TranslationResult {
  constructor(private value: string | string[]) {}

  public toString(): string {
    if (Array.isArray(this.value)) {
      return this.value[0] || '';
    }
    return this.value || '';
  }

  public toArray(): string[] {
    return Array.isArray(this.value) ? this.value : [this.value || ''];
  }

  public getValue(): string | string[] {
    return this.value;
  }
}

@Injectable({
  providedIn: 'root'
})
export class TranslationService implements ITranslationService {
  constructor(private translateService: TranslateService) {
    this.translateService.setDefaultLang('en');
    this.translateService.use('en');
  }

  /**
   * Gets the current language
   */
  public getCurrentLang(): string {
    return this.translateService.currentLang;
  }

  /**
   * Gets the default language
   */
  public getDefaultLang(): string {
    return this.translateService.defaultLang;
  }

  /**
   * Gets all available languages
   */
  public getAvailableLangs(): string[] {
    return this.translateService.getLangs();
  }

  /**
   * Sets the default language
   */
  public setDefaultLang(lang: string): void {
    this.translateService.setDefaultLang(lang);
  }

  /**
   * Changes the current language
   */
  public use(lang: string): Observable<Record<string, unknown>> {
    return this.translateService.use(lang);
  }

  private getTranslationValue(obj: unknown, key: string): string {
    if (!obj || typeof obj !== 'object') {
      return '';
    }

    if (typeof obj === 'object') {
      for (const [keyTest, value] of Object.entries(obj)) {
        if (keyTest === key && !!value) {
          return value as string;
        }
      }

    }

    const keys = key.split('.');
    let current = obj as TranslationObject;

    for (const k of keys) {
      if (!current || typeof current !== 'object') {
        return '';
      }
      const value = current[k];
      if (typeof value === 'string') {
        return value;
      }
      current = value;
    }

    return '';
  }

  /**
   * Gets a translation value
   */
  public get(key: string | string[], interpolateParams?: Record<string, unknown>): Observable<TranslationResult> {
    return this.translateService.get(key, interpolateParams).pipe(
      map(translations => {
        if (Array.isArray(key)) {
          console.log('key', this.getTranslationValue(translations, key[0]));

          return new TranslationResult(key.map(k => this.getTranslationValue(translations, k)));
        }
        return new TranslationResult(this.getTranslationValue(translations, key));
      })
    );
  }

  /**
   * Gets a translation value instantly
   */
  public instant(key: string | string[], interpolateParams?: Record<string, unknown>): TranslationResult {
    const translation = this.translateService.instant(key, interpolateParams) as string | string[] | Record<string, unknown>;
    if (typeof translation === 'string') {
      return new TranslationResult(translation);
    }
    if (Array.isArray(translation)) {
      return new TranslationResult(translation);
    }
    return new TranslationResult('');
  }

  /**
   * Gets a stream of translations that updates when the language changes
   */
  public stream(key: string | string[], interpolateParams?: Record<string, unknown>): Observable<TranslationResult> {
    return this.translateService.stream(key, interpolateParams).pipe(
      map(translations => {
        if (Array.isArray(key)) {
          return new TranslationResult(key.map(k => this.getTranslationValue(translations, k)));
        }
        return new TranslationResult(this.getTranslationValue(translations, key));
      })
    );
  }

  /**
   * Gets the browser language
   */
  public getBrowserLang(): string | undefined {
    return this.translateService.getBrowserLang();
  }

  /**
   * Gets the browser culture language
   */
  public getBrowserCultureLang(): string | undefined {
    return this.translateService.getBrowserCultureLang();
  }

  /**
   * Reloads translations for a specific language
   */
  public reloadLang(lang: string): Observable<Record<string, unknown>> {
    return this.translateService.reloadLang(lang);
  }

  /**
   * Resets translations for a specific language
   */
  public resetLang(lang: string): void {
    this.translateService.resetLang(lang);
  }
}
