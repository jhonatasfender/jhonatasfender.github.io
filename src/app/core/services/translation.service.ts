import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, BehaviorSubject } from 'rxjs';
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
  providedIn: 'root',
})
export class TranslationService implements ITranslationService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  constructor(private translateService: TranslateService) {
    this.translateService.setDefaultLang('en');
    this.translateService.use('en');
  }

  public getCurrentLang(): string {
    return this.translateService.currentLang;
  }

  public getDefaultLang(): string {
    return this.translateService.defaultLang;
  }

  public getAvailableLangs(): string[] {
    return this.translateService.getLangs();
  }

  public setDefaultLang(lang: string): void {
    this.translateService.setDefaultLang(lang);
  }

  public use(lang: string): Observable<Record<string, unknown>> {
    this.loadingSubject.next(true);
    return this.translateService.use(lang).pipe(
      map((result) => {
        this.loadingSubject.next(false);
        return result;
      }),
    );
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

  public get(
    key: string | string[],
    interpolateParams?: Record<string, unknown>,
  ): Observable<TranslationResult> {
    return this.translateService.get(key, interpolateParams).pipe(
      map((translations) => {
        if (Array.isArray(key)) {
          return new TranslationResult(
            key.map((k) => this.getTranslationValue(translations, k)),
          );
        }
        return new TranslationResult(
          this.getTranslationValue(translations, key),
        );
      }),
    );
  }

  public instant(
    key: string | string[],
    interpolateParams?: Record<string, unknown>,
  ): TranslationResult {
    const translation = this.translateService.instant(
      key,
      interpolateParams,
    ) as string | string[] | Record<string, unknown>;
    if (typeof translation === 'string') {
      return new TranslationResult(translation);
    }
    if (Array.isArray(translation)) {
      return new TranslationResult(translation);
    }
    return new TranslationResult('');
  }

  public stream(
    key: string | string[],
    interpolateParams?: Record<string, unknown>,
  ): Observable<TranslationResult> {
    return this.translateService.stream(key, interpolateParams).pipe(
      map((translations) => {
        if (Array.isArray(key)) {
          return new TranslationResult(
            key.map((k) => this.getTranslationValue(translations, k)),
          );
        }
        return new TranslationResult(
          this.getTranslationValue(translations, key),
        );
      }),
    );
  }

  public getBrowserLang(): string | undefined {
    return this.translateService.getBrowserLang();
  }

  public getBrowserCultureLang(): string | undefined {
    return this.translateService.getBrowserCultureLang();
  }

  public reloadLang(lang: string): Observable<Record<string, unknown>> {
    this.loadingSubject.next(true);
    return this.translateService.reloadLang(lang).pipe(
      map((result) => {
        this.loadingSubject.next(false);
        return result;
      }),
    );
  }

  public resetLang(lang: string): void {
    this.translateService.resetLang(lang);
  }
}
