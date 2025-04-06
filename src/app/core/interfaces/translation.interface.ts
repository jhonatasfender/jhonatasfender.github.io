import { Observable } from 'rxjs';
import { InjectionToken } from '@angular/core';

export interface TranslationResult {
  toString(): string;
  toArray(): string[];
  getValue(): string | string[];
}

export interface ITranslationService {
  getCurrentLang(): string;
  getDefaultLang(): string;
  getAvailableLangs(): string[];
  setDefaultLang(lang: string): void;
  use(lang: string): Observable<Record<string, unknown>>;
  get(key: string | string[], interpolateParams?: Record<string, unknown>): Observable<TranslationResult>;
  instant(key: string | string[], interpolateParams?: Record<string, unknown>): TranslationResult;
  stream(key: string | string[], interpolateParams?: Record<string, unknown>): Observable<TranslationResult>;
  getBrowserLang(): string | undefined;
  getBrowserCultureLang(): string | undefined;
  reloadLang(lang: string): Observable<Record<string, unknown>>;
  resetLang(lang: string): void;
}

export const TRANSLATION_SERVICE = new InjectionToken<ITranslationService>('TranslationService');
